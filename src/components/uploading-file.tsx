import { AlignRight, Clock4, Copy, Download, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import AudioPlayer from "./audio-player";


export default function UploadingFile() {

    return (
        <section className="w-full pt-[22px]  px-[14px]">
            <Tabs defaultValue="text" dir="rtl">
                <TabsList className="bg-white border-b w-full justify-between rounded-b-[0px] pb-3.5">
                    <div>
                        <TabsTrigger value="text" className="pb-[17px] data-[state=active]:bg-white shadow-none data-[state=active]:border-b-black rounded-b-[0px]  " >
                            <AlignRight />
                            متن ساده
                        </TabsTrigger>
                        <TabsTrigger value="speach" className="pb-[17px]  shadow-none data-[state=active]:border-b-black  data-[state=active]:border-b rounded-b-[0px] ">
                            <Clock4 />
                            متن زمان‌بندی شده
                        </TabsTrigger>
                    </div>
                    <div className="flex justify-center items-center gap-x-5">
                        <Download width={17} height={17} className="hover:text-[#07B49B]" />
                        <Copy width={17} height={17} className="hover:text-[#07B49B]" />
                        <Button className="rounded-[20px] bg-[#118AD3] text-white" variant={"outline"} >
                            <RefreshCw />
                            شروع دوباره
                        </Button>
                    </div>
                </TabsList>
                <TabsContent value="text">
                    <ScrollArea className="h-[300px]  font-iranyekan-light text-black p-4" dir="rtl">
                        [با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]
                        [با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]
                        [با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]
                    </ScrollArea>
                    <div className="flex justify-center items-center w-full">
                        <AudioPlayer />
                    </div>
                </TabsContent>
                <TabsContent value="speach">
                    <ScrollArea className="h-[300px]  font-iranyekan-light text-black p-4" dir="rtl">
                        <section className="w-full ">
                            <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                <div className="gap-x-[17px] flex justify-center items-center">
                                    <span>00:03</span>
                                    <span>00:00</span>
                                </div>
                                <span>[با]</span>
                            </div>
                            <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                <div className="gap-x-[17px] flex justify-center items-center">
                                    <span>00:03</span>
                                    <span>00:00</span>
                                </div>
                                <span>[با]</span>
                            </div>
                            <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                <div className="gap-x-[17px] flex justify-center items-center">
                                    <span>00:03</span>
                                    <span>00:00</span>
                                </div>
                                <span>[با]</span>
                            </div>
                            <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                <div className="gap-x-[17px] flex justify-center items-center">
                                    <span>00:03</span>
                                    <span>00:00</span>
                                </div>
                                <span>[با]</span>
                            </div>
                            <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                <div className="gap-x-[17px] flex justify-center items-center">
                                    <span>00:03</span>
                                    <span>00:00</span>
                                </div>
                                <span>[با]</span>
                            </div>
                            <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                <div className="gap-x-[17px] flex justify-center items-center">
                                    <span>00:03</span>
                                    <span>00:00</span>
                                </div>
                                <span>[با]</span>
                            </div>
                        </section>
                    </ScrollArea>
                    <div className="flex justify-center items-center w-full">
                        <AudioPlayer />
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    )
}
