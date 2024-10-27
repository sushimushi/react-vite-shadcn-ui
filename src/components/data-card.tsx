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
        <CardHeader className="p-0">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="p-0">
          <p>Card Footer</p>
        </CardFooter>
      </div>
    </Card>
  );
};