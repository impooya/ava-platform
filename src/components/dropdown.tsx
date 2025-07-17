import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import type React from "react";

type Option = {
    label: string;
    icon?: React.ReactNode;
};

function Dropdown({ options }: { options: Option[] }) {
    return (
        <Accordion type="single" collapsible className="rounded-[20px] border-[1.5px] border-[#00BA9F] text-[#00BA9F] px-[15px] w-fit">
            <AccordionItem value="item-1">
                <AccordionTrigger className=" flex items-center gap-2 p-2  [&>svg]:text-[#00BA9F]">
                    <div className=" flex items-center  ">
                        {options[0]?.icon}
                        <span>{options[0]?.label}</span>
                    </div>

                </AccordionTrigger>
                <AccordionContent className="[&>div]:border-t-[#00BA9F]">
                    {options.slice(1).map((option, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 border-t">
                            {option.icon}
                            <span>{option.label}</span>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default Dropdown;