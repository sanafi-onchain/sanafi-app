import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { SanafiAIChat } from "@/components/AI/SanafiAIChat";

export default function Learn() {
  return (
    <div className="h-[calc(100vh-11rem)]">
      <Card className="border-none h-full bg-transparent shadow-none">
        <CardHeader className="pb-2">
          <CardTitle>Sanafi AI</CardTitle>
          <CardDescription>
            Ask our AI assistant anything about Islamic finance and Sharia-compliant investing
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)]">
          <SanafiAIChat />
        </CardContent>
      </Card>
    </div>
  );
}