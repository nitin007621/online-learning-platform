import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the project</h1>
      <Button>Click ME</Button>
      <UserButton/>
    </div>
  );
}
