import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DataCard({ Icon }: { Icon: React.ReactNode }) {
  return (
    <Card className="flex">
      <div className="grid place-content-center max-w-20 grow">
        <div className="p-4 bg-accent rounded-full">
          {Icon}
        </div>
      </div>
      <div className="grid gap-4 py-4">
        <CardContent className="p-0">
          <p>Today</p>
        </CardContent>
        <CardHeader className="p-0">
          <CardTitle className="text-primary">Card Title</CardTitle>
        </CardHeader>
        <CardFooter className="p-0">
          <p>Y'day</p>
        </CardFooter>
      </div>
    </Card>
  );
};