
use starknet::ContractAddress;
use starknet::get_caller_address;

#[starknet::interface]
trait VotingABI<TContractState> {

    // Voting functions
    fn vote(ref self: TContractState,election_index: felt252, president_index: felt252);
    fn get_all_votes(self: @TContractState) -> Array<felt252>;
    fn get_quantity_votes(self: @TContractState) -> felt252;
    fn get_my_vote(self: @TContractState) -> felt252;

    //Election management functions
    fn create_election(ref self: TContractState, election_name: felt252, presidents_index: Array<felt252>);
    fn get_all_elections(self: @TContractState) ->  Array<felt252>;

    // President management functions
    fn create_president(ref self: TContractState, president_name: felt252);
    fn get_all_presidents(self: @TContractState, president_index: felt252) -> Array<felt252>;

    fn vote(ref self: TContractState, president_index: felt252, secret_hash: felt252);
    fn get_votes(self: @TContractState, proposal_index: felt252) -> felt252;

}

#[starknet::contract]
mod VotingContract {
    use super::{ContractAddress, get_caller_address, VotingABI};

    use starknet::storage::{StorageMapReadAccess, StorageMapWriteAccess, StoragePointerWriteAccess};
    use starknet::storage::StoragePathEntry;
    use starknet::storage::StoragePointerReadAccess;
    use starknet::storage::Map;

    #[storage]
    struct Storage {
        // Map to store votes
        vote: Map<ContractAddress, (felt252, felt252, felt252)>, // (election_index, president_index, boolean indicating if the user has voted)
        quantity_votes: felt252, // Total number of votes cast
        voters: Map<felt252, ContractAddress>, // Map of voters by index
        // Map to store votes for each election
        id_elections: felt252, // Unique identifier for elections
        election: Map<felt252, felt252>, // (election_index, president_index)
        election_name: Map<felt252, felt252>, // (election_index, name_election)
        election_president_len: Map<felt252, felt252>, // (election_index, quantity of presidents)
        // Quantity of votes for each election
        // Map to store votes for each president
        id_presidents: felt252, // Unique identifier for presidents
        president: Map<felt252, felt252>,
        president_count: Map<felt252, felt252>, // (president, quantity of votes)
        election_count: Map<felt252, felt252>, // (election_index, quantity of elections)
    }

    

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.id_elections.write(0); // Initialize election ID
        self.id_presidents.write(0); // Initialize president ID

    use starknet::storage::Map;
    use starknet::storage::{StorageMapReadAccess, StorageMapWriteAccess};
    use starknet::storage::{StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        has_voted: Map<(ContractAddress, felt252), felt252>, // user -> proposal_index -> has_voted
        proposal_count: felt252,
        proposal_votes: Map<felt252, felt252>,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.proposal_count.write(0);

    }

    #[abi(embed_v0)]
    impl VotingABIImpl of VotingABI<ContractState> {

        fn vote(ref self: ContractState,election_index: felt252, president_index: felt252) {
            // Verificar que no ha votado antes
            let caller = get_caller_address();
            let already_voted = self.vote.read(caller);
            let (election_idx, president_idx, has_voted) = already_voted;
            assert(has_voted == 0, 'User already voted');

            let election_vec = self.election.read(election_index);

            // --- Validation Logic ---
            // A common validation is to check if the election_index exists and has presidents registered.
            // You can check the length of the Vec. If len > 0, the election exists and has presidents.
            assert(election_vec != 0, 'Invalid election index'); 
            
            if( president_index != self.president.read(election_index) ) {
                // Si el índice del presidente es inválido, lanzar un error
                assert(false, 'Invalid president index');
            }

            let len = self.election_president_len.read(election_index);
            let mut i: u32 = 0;
            let mut president_is_valid = false;

            while i < len.try_into().unwrap() {
                let stored_president = self.election.read(election_index);
                if stored_president == president_index {
                    president_is_valid = true;
                    break;
                };
                i += 1;
            }


            assert(president_is_valid, 'Invalid president index');
            // --- End Validation Logic ---

            // Record the vote and mark the user as voted
            let voted_tuple = (election_index, president_index, 1); // Use 1 to indicate 

            // Registrar voto
            self.vote.write(caller, voted_tuple);

            let current_votes_presidents = self.president_count.read(president_index);
            let current_votes_elections = self.election_count.read(election_index);

            // Actualizar conteo de votos
            self.president_count.write(president_index, current_votes_presidents + 1);
            self.election_count.write(election_index, current_votes_elections + 1);
            self.quantity_votes.write(self.quantity_votes.read() + 1);
        }

        fn get_all_votes(self: @ContractState) -> Array<felt252> {
            let mut all_votes = array![];

            let count_felt = self.quantity_votes.read();
            let count = count_felt.try_into().unwrap(); // convierte felt252 a usize
            let mut i: u32 = 0;
            while i < count {
                let address: ContractAddress = self.voters.read(i.into());

                let (election, president, voted) = self.vote.read(address);
                all_votes.append(election);
                all_votes.append(president);
                all_votes.append(voted);
                i += 1;
            };
            all_votes
        }
        
        fn get_my_vote(self: @ContractState) -> felt252 {
            // Obtener si el usuario ha votado por el presidente
            let caller = get_caller_address();
            let already_voted = self.vote.read(caller);
            let (election_idx, president_idx, has_voted) = already_voted;

            return has_voted;
        }

        fn get_quantity_votes(self: @ContractState) -> felt252 {
            // Devolver todos los votos
            return self.quantity_votes.read();
        }

        fn create_election(
            ref self: ContractState,
            election_name: felt252,
            presidents_index: Array<felt252>
        ) {
            // Crear nuevo ID
            let current_id = self.id_elections.read();
            let new_id = current_id + 1;
            self.id_elections.write(new_id);
        
            // Guardar nombre de la elección
            self.election_name.write(new_id, election_name);
        
            // Inicializar contador de presidentes
            let mut i: u32 = 0;
            let len = presidents_index.len();
        
            // Recorrer presidentes y guardar uno por uno
            while i < len.try_into().unwrap() {
                // Validar si existe en mapa global
                let key: felt252 = i.into();
                assert(self.president.read(key) != 0, 'Invalid president');
        
                // Guardar presidente asociado a esta elección
                self.election.write(new_id, key);
                i += 1;
            }
        
            // Inicializar el contador de votos
            self.election_count.write(new_id, 0);
        }

        fn get_all_elections(self: @ContractState) -> Array<felt252> {
            let mut i: u32 = 0;
            let len = self.id_elections.read();
            let mut elections = array![];
            
            while i < len.try_into().unwrap() {
                // Validar si existe en mapa global
                let key: felt252 = i.into();
                let name = self.election_name.read(key);
                assert(name != 0, 'Invalid election');
                i += 1;
                elections.append(name);
            }

            return elections;
        }

        fn create_president(ref self: ContractState, president_name: felt252) {
            // Crear un nuevo presidente
            // Crear nuevo ID
            let current_id = self.id_presidents.read();
            let new_id = current_id + 1;
            self.id_presidents.write(new_id);
                    
            // Guardar nombre de la elección
            self.president.write(new_id, president_name);

            self.president_count.write(new_id, 0); // Inicializar con 0 votos
        }

        fn get_all_presidents(self: @ContractState, president_index: felt252) -> Array<felt252> {
            // Obtener todos los presidentes
            let mut all_presidents = array![];
            let count_felt = self.president_count.read(president_index);
            let count = count_felt.try_into().unwrap(); // convierte felt252 a usize
            let mut i: usize = 0;
            while i < count {
                all_presidents.append(self.president.entry(i.into()).read());
                i += 1;
            };
            return all_presidents;
        }

   }
        fn vote(ref self: ContractState, president_index: felt252, secret_hash: felt252) {
            // Verificar que no ha votado antes
            let caller = get_caller_address();
            let already_voted = self.has_voted.read((caller, president_index));
            assert(already_voted == 0, 'User already voted');

            // Registrar voto
            self.has_voted.write((caller, president_index), 1);

            // Actualizar conteo de votos
            let current_votes = self.proposal_votes.read(president_index);
            self.proposal_votes.write(president_index, current_votes + 1);
        }

        fn get_votes(self: @ContractState, proposal_index: felt252) -> felt252 {
            // Obtener votos para el presidente
            let votes = self.proposal_votes.read(proposal_index);
            return votes;
        }
    }

}