import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Disc3, Mic } from "lucide-react";
import AudioPlayer from "./audio-player";
import { toast } from "sonner";
const mimeType = "audio/webm";

//? thanks https://blog.logrocket.com/how-to-create-video-audio-recorder-react/#audio-recorder-component web site
const AudioRecorder = () => {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const [recordingStatus, setRecordingStatus] = useState<"recording" | "inactive" | "pause">("inactive");
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audio, setAudio] = useState<string | null>(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err);
            }
        } else {
            toast.error("مرورگر شما از MEDIA-RECORDER پشتیبانی نمیکند")
            // alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        if (!stream) return;
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        // @ts-expect-error type option not supported by TypeScript typings but works in browser
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        const localAudioChunks: Blob[] = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        if (!mediaRecorder.current) return;
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };

    };


    return (
        <>
            <div className="flex justify-center flex-col items-center w-full h-full">
                {!permission ? (
                    <>
                        <Button
                            onClick={getMicrophonePermission}
                            variant={"default"}
                            size={"icon"}
                            className="hover:bg-[#00B3A1] mb-2 w-[62px] h-[62px] text-white rounded-full bg-[#00B3A1]"
                        >
                            <Mic />
                        </Button>
                        <span className="w-[276px] text-center">
                            <p className="text-[#626262] font-iranyekan-light text-base">
                                برای دسترسی به میکروفون، دکمه را فشار دهید
                            </p>
                        </span>
                    </>
                ) : null}

                {permission && recordingStatus === "inactive" && !audio ? (
                    <>
                        <Button
                            variant={"default"}
                            size={"icon"}
                            className="hover:bg-[#00B3A1] mb-2 w-[62px] h-[62px] text-white rounded-full bg-[#00B3A1]"
                        >
                            <Disc3 className="animate-spin" />
                        </Button>
                        <Button onClick={startRecording} type="button" variant={"outline"}>
                            شروع رکورد
                        </Button>
                        <span className="w-[276px] text-center mt-4">
                            <p className="text-[#626262] font-iranyekan-light text-base">
                                برای شروع به صحبت، دکمه را فشار دهید
                                متن پیاده شده آن، در اینجا ظاهر شود
                            </p>
                        </span>
                    </>
                ) : null}

                {recordingStatus === "recording" ? (
                    <>
                        <Button
                            variant={"default"}
                            size={"icon"}
                            className="hover:bg-red-500 mb-2 w-[62px] h-[62px] text-white rounded-full bg-red-500 animate-pulse"
                        >
                            <Disc3 className="animate-spin" />
                        </Button>
                        <Button onClick={stopRecording} type="button" variant={"outline"}>
                            توقف رکورد
                        </Button>
                        <span className="w-[276px] text-center mt-4">
                            <p className="text-[#626262] font-iranyekan-light text-base">
                                در حال ضبط... برای توقف دکمه را فشار دهید
                            </p>
                        </span>
                    </>
                ) : null}

                {audio ? (
                    <>
                        <Button
                            variant={"default"}
                            size={"icon"}
                            className="hover:bg-[#00B3A1] mb-2 w-[62px] h-[62px] text-white rounded-full bg-green-500"
                        >
                            <Disc3 />
                        </Button>
                        <div className="mb-4">
                            <AudioPlayer audioId="-1" src={audio} thumbColor="#00B3A1" rangeColor="#00B3A1" />
                        </div>
                        <a download href={audio} className="text-[#00B3A1] underline mb-4">
                            دانلود فایل ضبط شده
                        </a>
                        <Button
                            onClick={() => {
                                setAudio(null);
                                setRecordingStatus("inactive");
                            }}
                            type="button"
                            variant={"outline"}
                            className="mt-2"
                        >
                            ضبط جدید
                        </Button>
                        <span className="w-[276px] text-center mt-4">
                            <p className="text-[#626262] font-iranyekan-light text-base">
                                ضبط با موفقیت تکمیل شد. می‌توانید فایل را پخش کنید یا دانلود کنید
                            </p>
                        </span>
                    </>
                ) : null}
            </div>
        </>
    );
};
export default AudioRecorder;