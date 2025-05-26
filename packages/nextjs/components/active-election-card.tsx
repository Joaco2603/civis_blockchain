import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { CalendarClock, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ActiveElectionCardProps {
  title: string;
  description: string;
  endDate: string;
  participation: number;
}

export function ActiveElectionCard({
  title,
  description,
  endDate,
  participation
}: ActiveElectionCardProps) {
  // Calculate remaining time
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = Math.max(0, end.getTime() - now.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const formattedDate = new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(end);

  return (
    <Card className="overflow-hidden border-blue-100 dark:border-blue-900">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/30 pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500 dark:text-gray-400 flex items-center">
                <CalendarClock className="h-3.5 w-3.5 mr-1" />
                Cierre: {formattedDate}
              </span>
              <span className="font-medium">
                {diffDays}d {diffHours}h restantes
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500 dark:text-gray-400">
                Participación
              </span>
              <span className="font-medium">{participation}%</span>
            </div>
            <Progress value={participation} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 bg-gray-50 dark:bg-gray-900">
        <Button asChild className="w-full">
          <Link href={`/dashboard/vote/active`}>
            Participar <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
