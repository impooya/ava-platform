import { useRef, useState } from "react"
import Dropdown from "./dropdown"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { mutate } from "swr";
import FileDetails from "./file-details";
import { useForm } from "react-hook-form";
import { linkSchema } from "@/validation/formSchema";
import type z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "lucide-react";
import AudioRecorder from "./audio-Recorder";
const baseURL = import.meta.env.VITE_API_BASE;
async function sendFileRequest(url: string, { arg }: { arg: FormData }) {
    return axios.post(url, arg, {
        headers: {
            Authorization: "Token a85d08400c622b50b18b61e239b9903645297196"
        }
    });
}

async function sendLinkRequest(url: string, { arg }: { arg: { media_urls: string[] } }) {
    return axios.post(url, arg, {
        headers: {
            Authorization: "Token a85d08400c622b50b18b61e239b9903645297196"
        }
    });
}

const options = [
    {
        label: "فارسی",

    },
    {
        label: "English",
    }
]

function UploadingSection() {
    const [showUploadingMethod, setShowUploadingMethod] = useState<"voice" | "file" | "link">("voice")
    const [showAfterFileUploader, setShowAfterFileUploader] = useState<"voice" | "file" | "link" | "none">("none")
    const { data: fileDetails, trigger: fileTrigger, isMutating: fileMutating } = useSWRMutation(`${baseURL}/transcribe_files/`, sendFileRequest, {
        onSuccess() {
            toast.success("ارسال با موفقیت انجام شد")
            mutate(() => true)
        },
        onError(err) {
            toast.error(`${err}`)
        },
    })

    const { data: linkDetails, trigger: linkTrigger, isMutating: linkMutating } = useSWRMutation(`${baseURL}/transcribe_files/`, sendLinkRequest, {
        onSuccess() {
            toast.success("ارسال با موفقیت انجام شد")
            mutate(() => true)
        },
        onError(err) {
            toast.error(`${err}`)
        },
    })
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const formData = new FormData()
        if (file) {
            formData.append("media_urls", file)
        }

        fileTrigger(formData).then((res) => {
            if (res.status === 200) {
                setShowAfterFileUploader("file")
            }
        })

    };

    const form = useForm<z.infer<typeof linkSchema>>({
        resolver: zodResolver(linkSchema),
        defaultValues: {
            media_url: "",
        },
    })

    function onSubmit(values: z.infer<typeof linkSchema>) {
        linkTrigger({ media_urls: [values.media_url] }).then((res) => {
            if (res.status === 200) {
                setShowAfterFileUploader("link")
            }
        })
    }
    return (
        <section className="mt-[47px] flex flex-col justify-center items-start">
            <div className="flex justify-center items-center gap-x-2">
                <button disabled={fileMutating || linkMutating} onClick={() => setShowUploadingMethod("voice")} className={`${showUploadingMethod === "voice" ? "bg-[#00BA9F] text-white font-iranyekan-regular text-base" : "hover:text-white hover:text-base hover:bg-[#00BA9F] hover:font-iranyekan-regular hover:shadow-[#6363630D]"} font-iranyekan-light text-sm  transition-all rounded-t-[10px] py-[14px] px-8 flex justify-center items-center gap-x-1.5`}>
                    <svg className="w-[13px] h-[21.66px]">
                        <use href="#mic-icon" />
                    </svg>
                    ضبط صدا
                </button>

                <button disabled={fileMutating || linkMutating} onClick={() => {
                    setShowUploadingMethod("file")
                }} className={`${showUploadingMethod === "file" ? "bg-[#118AD3] text-white font-iranyekan-regular text-base" : "hover:text-white hover:text-base hover:bg-[#118AD3] hover:font-iranyekan-regular hover:shadow-[#6363630D]"} font-iranyekan-light text-sm  transition-all rounded-t-[10px] py-[15px] px-7 flex justify-center items-center gap-x-1.5`}>
                    <svg className="w-[18.34px] h-[15px]">
                        <use href="#upload-icon" />
                    </svg>
                    بارگذاری فایل</button>
                <button disabled={fileMutating || linkMutating} onClick={() => setShowUploadingMethod("link")} className={`${showUploadingMethod === "link" ? "bg-[#FF1654] text-white font-iranyekan-regular text-base" : "hover:text-white hover:text-base hover:bg-[#FF1654] hover:font-iranyekan-regular hover:shadow-[#6363630D]"} font-iranyekan-light text-sm  transition-all rounded-t-[10px] py-[15px] px-8 flex justify-center items-center gap-x-1.5`}>
                    <svg className="w-[20.42px] h-[16.67px]">
                        <use href="#chain-icon" />
                    </svg>
                    لینک</button>
            </div>
            <section className={`${showUploadingMethod === "voice" ? "border-[#00BA9F]" : showUploadingMethod === "file" ? "border-[#118AD3]" : "border-[#FF1654]"}  shadow-[#6363630D] rounded-[25px] border rounded-tr-sm  h-[429px] w-[653px]`}>
                {
                    showUploadingMethod === "voice" ? (
                        <AudioRecorder />
                    ) : showUploadingMethod === "file" ? (
                        <>
                            {
                                showAfterFileUploader === "file" ? (<FileDetails fileData={fileDetails?.data} startOver={setShowAfterFileUploader} />) : (<div className="flex justify-center flex-col items-center  w-full h-full">
                                    <input hidden type="file" ref={fileInputRef} onChange={handleFileChange} />
                                    {
                                        fileMutating ? (
                                            <>

                                                <span className="w-[415px] text-center">
                                                    <p className="text-[#626262] font-iranyekan-light text-base ">در حال ارسال...</p>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => {
                                                    handleFileButtonClick()
                                                }} className="cursor-pointer mb-2 w-[62px] h-[62px] flex justify-center items-center  px-[21px] py-[14px] text-white rounded-full bg-[#118AD3] ">
                                                    <svg className="w-[62px] h-[62px]">
                                                        <use href="#upload-icon" />
                                                    </svg>
                                                </button>
                                                <span className="w-[415px] text-center">
                                                    <p className="text-[#626262] font-iranyekan-light text-base ">برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
                                                        متن پیاده شده آن، در اینجا ظاهر می شود</p>
                                                </span>
                                            </>)
                                    }

                                </div>)
                            }

                        </>

                    ) : (
                        showAfterFileUploader === "link" ? (<FileDetails fileData={linkDetails?.data} startOver={setShowAfterFileUploader} />) : (<div className="flex justify-center flex-col items-center  w-full h-full">
                            {
                                linkMutating ? (
                                    <span className="w-[415px] text-center">
                                        <p className="text-[#626262] font-iranyekan-light text-base ">در حال ارسال...</p>
                                    </span>
                                ) : (
                                    <>
                                        <Form {...form}>
                                            <form className="relative" onSubmit={form.handleSubmit(onSubmit)}>
                                                <FormField
                                                    control={form.control}
                                                    name="media_url"
                                                    render={({ field }) => (
                                                        <FormItem className="mb-[9px]">
                                                            <FormControl>
                                                                <Input {...field} type="text" dir="ltr" placeholder="example.com/sample.mp3" className=" placeholder:font-iranyekan-light  pl-11 placeholder:text-#626262  w-[320px]   border-[#FF1654] rounded-[50px] h-12" />
                                                            </FormControl>
                                                            <Button className="absolute top-[10px] left-[10px] mb-2 w-[30px] h-[30px] text-white rounded-full bg-[#FF1654] hover:bg-[#FF1654]">
                                                                <Link />
                                                            </Button>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                            </form>
                                        </Form>
                                        <span className="w-[415px] text-center">
                                            <p className="text-[#626262] font-iranyekan-light text-base ">نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد
                                                و دکمه را فشار دهید</p>
                                        </span>
                                    </>
                                )
                            }
                        </div>)

                    )
                }
            </section>
            <div className="mt-6 flex justify-end w-full items-center gap-x-2 ">
                <p className="font-iranyekan-light text-[#626262] text-sm">زبان گفتار:</p>
                <Dropdown options={options} />
            </div>
        </section >
    )
}

export default UploadingSection