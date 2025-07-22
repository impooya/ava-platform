import { useRef, useState } from "react"
import Dropdown from "./dropdown"

import axios from "axios";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { mutate } from "swr";
import FileDetails from "./file-details";
async function sendRequest(url: string, { arg }: { arg: { media_urls: string[] } }) {
    return axios.post(url, arg, {
        headers: {
            Authorization: `${import.meta.env.VITE_API_TOKEN}`,
        },
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
    const { data, trigger, isMutating } = useSWRMutation(`/api/transcribe_files/`, sendRequest, {
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
        console.log(e)
        // const file = e.target.files?.[0];
        // const formData = new FormData()
        // if (file) {
        //     console.log(file)
        //     formData.append("media_urls", file)
        // }

        trigger({
            media_urls: ["https://i.ganjoor.net/a2/27065-fz-805148302.mp3"]
        }).then((res) => {
            if (res.status === 200) {
                setShowAfterFileUploader("file")
            }
        })

    };
    return (
        <section className="mt-[47px] flex flex-col justify-center items-start">
            <div className="flex justify-center items-center gap-x-2">
                <button onClick={() => setShowUploadingMethod("voice")} className={`${showUploadingMethod === "voice" ? "bg-[#00BA9F] text-white font-iranyekan-regular text-base" : "hover:text-white hover:text-base hover:bg-[#00BA9F] hover:font-iranyekan-regular hover:shadow-[#6363630D]"} font-iranyekan-light text-sm  transition-all rounded-t-[10px] py-[14px] px-8 flex justify-center items-center gap-x-1.5`}>
                    <svg className="w-[13px] h-[21.66px]">
                        <use href="#mic-icon" />
                    </svg>
                    ضبط صدا
                </button>

                <button onClick={() => {
                    setShowUploadingMethod("file")
                }} className={`${showUploadingMethod === "file" ? "bg-[#118AD3] text-white font-iranyekan-regular text-base" : "hover:text-white hover:text-base hover:bg-[#118AD3] hover:font-iranyekan-regular hover:shadow-[#6363630D]"} font-iranyekan-light text-sm  transition-all rounded-t-[10px] py-[15px] px-7 flex justify-center items-center gap-x-1.5`}>
                    <svg className="w-[18.34px] h-[15px]">
                        <use href="#upload-icon" />
                    </svg>
                    بارگذاری فایل</button>
                <button onClick={() => setShowUploadingMethod("link")} className={`${showUploadingMethod === "link" ? "bg-[#FF1654] text-white font-iranyekan-regular text-base" : "hover:text-white hover:text-base hover:bg-[#FF1654] hover:font-iranyekan-regular hover:shadow-[#6363630D]"} font-iranyekan-light text-sm  transition-all rounded-t-[10px] py-[15px] px-8 flex justify-center items-center gap-x-1.5`}>
                    <svg className="w-[20.42px] h-[16.67px]">
                        <use href="#chain-icon" />
                    </svg>
                    لینک</button>
            </div>
            <section className={`${showUploadingMethod === "voice" ? "border-[#00BA9F]" : showUploadingMethod === "file" ? "border-[#118AD3]" : "border-[#FF1654]"}  shadow-[#6363630D] rounded-[25px] border rounded-tr-sm  h-[429px] w-[653px]`}>
                {
                    showUploadingMethod === "voice" ? (
                        <div className="flex justify-center flex-col items-center  w-full h-full">
                            <span className="mb-2 w-[62px] h-[62px] flex justify-center items-center text-white rounded-full bg-[#00B3A1] px-[21px] py-[14px]">
                                <svg className="w-[62px] h-[62px]">
                                    <use href="#mic-icon" />
                                </svg>
                            </span>
                            <span className="w-[276px] text-center">
                                <p className="text-[#626262] font-iranyekan-light text-base ">برای شروع به صحبت، دکمه را فشار دهید
                                    متن پیاده شده آن، در اینجا ظاهر شود</p>
                            </span>
                        </div>
                    ) : showUploadingMethod === "file" ? (
                        <>
                            {
                                showAfterFileUploader === "file" ? (<FileDetails fileData={data?.data} startOver={setShowAfterFileUploader} />) : (<div className="flex justify-center flex-col items-center  w-full h-full">
                                    <input hidden type="file" ref={fileInputRef} onChange={handleFileChange} />
                                    {
                                        isMutating ? (
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
                        <div className="flex justify-center flex-col items-center  w-full h-full">
                            <div className="relative">
                                <input type="text" dir="ltr" placeholder="example.com/sample.mp3" className="mb-[9px] placeholder:font-iranyekan-light placeholder:text-#626262 focus:outline-0 w-[320px] py-[9px] px-[58px] border-[0.5px] border-[#FF1654] rounded-[50px]" />
                                <span className="absolute top-[9px] left-[18px] mb-2 w-[30px] h-[30px] flex justify-center items-center text-white rounded-full bg-[#FF1654] px-[9px] py-[7px]">
                                    <svg className="w-[15.80px] h-[12.90px]">
                                        <use href="#chain-icon" />
                                    </svg>
                                </span>
                            </div>
                            <span className="w-[415px] text-center">
                                <p className="text-[#626262] font-iranyekan-light text-base ">نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد
                                    و دکمه را فشار دهید</p>
                            </span>
                        </div>
                    )
                }
            </section>
            <div className="mt-6 flex justify-end w-full items-center gap-x-2 ">
                <p className="font-iranyekan-light text-[#626262] text-sm">زبان گفتار:</p>
                <Dropdown options={options} />
            </div>
        </section>
    )
}

export default UploadingSection