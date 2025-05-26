import { LoginForm } from "~~/components/login-form";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";
import { SwitchTheme } from "~~/components/SwitchTheme";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
      <SwitchTheme />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Civis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Plataforma de votación segura y transparente basada en blockchain
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Para probar la plataforma, puedes usar:</p>
          <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-left">
            <p>
              <strong>Tu wallet:</strong>{" "}
              <code className="text-blue-600 dark:text-blue-400">
                0xj429421jfkda3213
              </code>
            </p>
            <p>
              <strong>Debes ser usuario:</strong>{" "}
              <code className="text-blue-600 dark:text-blue-400">
                verificado
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
