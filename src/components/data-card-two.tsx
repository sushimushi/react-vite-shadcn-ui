import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AppTooltip } from "./app-tooltip";

export function DataCardTwo({ data }: { data: any }) {
  return (
    <Card className="grid md:grid-cols-2 lg:grid-cols-4 p-3">
      {Object.keys(data).filter(key => key !== "from" && key !== "to").map((key) => (
        <div>
          <div key={key} className="grid gap-2 grow">
            <CardContent className="p-0 text-xs font-semibold">
              <p>{data[key].title} <AppTooltip Info={data[key].desc} /></p>
            </CardContent>
            <CardHeader className="p-0">
              <CardTitle className="text-primary font-bold">{key === "total" ? data.total.value : data[key].value / data.total.value * 100 + "%"}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-xs font-semibold">
              {key !== "total" && `(${data[key].value})`}
            </CardContent>
          </div>
        </div>
      ))}
    </Card>
  );
};