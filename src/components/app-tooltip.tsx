import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

export function AppTooltip ({Info}:{Info:string}) {
    return (
        <HoverCard>
        <HoverCardTrigger>
          <span className='font-serif bg-primary rounded-full text-white text-center inline-block px-[0.4rem] text-xs ml-1'>i</span>
        </HoverCardTrigger>
        <HoverCardContent>
          {Info}
        </HoverCardContent>
      </HoverCard>
      
    )
}