import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { timeToSeconds } from "@/utils/timeToSeconds";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import AudioPlayer from "./audio-player";
import { formatDuration } from "@/utils/formatDuration";
import { AlignRight, Clock4 } from "lucide-react";
import type { Row } from "@tanstack/react-table";
import type { FileData } from "@/types/HarfListResponse";
export const ExpandedRowContent = memo(({
    row
}: {
    row: Row<FileData>
}) => {
    // Only select the specific audio state for this row
    const audioCurrentTime = useSelector((state: RootState) => state.speech.time);
    const audioCurrentId = useSelector((state: RootState) => state.speech.currentPlayingId);
    const isActiveSegment = useCallback((segStart: string, segEnd: string, currentTime: number): boolean => {
        const startSeconds = timeToSeconds(segStart);
        const endSeconds = timeToSeconds(segEnd);
        return currentTime >= startSeconds && currentTime <= endSeconds;
    }, []);

    return (
        <div className="bg-gray-50 p-4 border-[#00BA9F] border rounded-[10px]">
            <section className="w-full pt-[22px] px-12">
                <Tabs defaultValue="text" dir="rtl">
                    <TabsList className="bg-white w-full flex justify-start items-start rounded-b-[0px] pb-3.5">
                        <div className="border-b">
                            <TabsTrigger value="text" className="pb-[17px] data-[state=active]:bg-white shadow-none data-[state=active]:border-b-black rounded-b-[0px]">
                                <AlignRight />
                                متن ساده
                            </TabsTrigger>
                            <TabsTrigger value="speach" className="pb-[17px] shadow-none data-[state=active]:border-b-black data-[state=active]:border-b rounded-b-[0px]">
                                <Clock4 />
                                متن زمان‌بندی شده
                            </TabsTrigger>
                        </div>
                    </TabsList>
                    <TabsContent value="text">
                        <ScrollArea className="h-[300px] text-wrap font-iranyekan-light text-base text-black p-4" dir="rtl">
                            {row?.original.segments.map((seg) => {
                                const isActive = isActiveSegment(seg.start, seg.end, audioCurrentTime);
                                return (
                                    <p
                                        key={`${seg.start}-${seg.end}`}
                                        className={`
                                                ${isActive && row.original.id === Number(audioCurrentId)
                                                ? 'text-[#00B3A1]  font-iranyekan-medium'
                                                : ''
                                            }
                                            transition-all duration-300 mb-2
                                            `}
                                    >
                                        {seg.text}
                                    </p>
                                );
                            })}
                        </ScrollArea>
                        <div className="flex justify-center items-center w-full">
                            <AudioPlayer
                                audioId={`${row.original.id}`}
                                src={row.original.url}
                                thumbColor="#00B3A1"
                                rangeColor="#00B3A1"
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="speach">
                        <ScrollArea className="h-[300px] font-iranyekan-light text-black p-4" dir="rtl">
                            <section className="w-full">
                                {row.original.segments.map((seg) => {
                                    const isActive = isActiveSegment(seg.start, seg.end, audioCurrentTime);
                                    return (
                                        <div key={`${seg.start}-${seg.end}`} className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                            <div className="gap-x-[17px] flex justify-center items-center">
                                                <span className={`
                                                        ${isActive
                                                        ? 'text-[#00B3A1]  font-iranyekan-medium'
                                                        : ''
                                                    }
                                                    transition-all duration-300`}>{formatDuration(seg.start)}</span>
                                                <span
                                                    className={`
                                                        ${isActive
                                                            ? 'text-[#00B3A1]  font-iranyekan-medium'
                                                            : ''
                                                        }
                                                        transition-all duration-300
                                                        `}
                                                >{formatDuration(seg.end)}</span>
                                            </div>
                                            <span className={`
                                                    ${isActive
                                                    ? 'text-[#00B3A1]  font-iranyekan-medium'
                                                    : ''
                                                }
                                                transition-all duration-300
                                                `}>{seg.text}</span>
                                        </div>)
                                })}
                            </section>
                        </ScrollArea>
                        <div className="flex justify-center items-center w-full">
                            <AudioPlayer
                                audioId={`${row.original.id}`}
                                src={row.original.url}
                                thumbColor="#00B3A1"
                                rangeColor="#00B3A1"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    );
});