import { intervalToDuration } from "date-fns";
import { Pause, Play, Square, Volume2 } from "lucide-react";
import { Slider } from "./ui/slider";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";


const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);


    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, []);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }

    };

    const handleVolumeChange = (value: number[]) => {
        if (audioRef.current) {
            const newVolume = value[0];
            audioRef.current.volume = newVolume;
            setVolume(newVolume);
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (timeInSeconds: number): string => {
        const duration = intervalToDuration({ start: 0, end: timeInSeconds * 1000 });
        return `${duration.minutes?.toString().padStart(2, '0') || '00'}:${duration.seconds?.toString().padStart(2, '0') || '00'
            }`;
    };

    const handleReset = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            // Optional: if you want to pause when reset
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="bg-[#F8F8F8]  py-2.5 gap-x-[13px]  px-2 rounded-[10px] w-auto flex justify-center items-center flex-row-reverse">
            {/* <audio controls /> */}
            <div className="flex justify-center items-center w-full gap-x-2">
                <Button variant={"ghost"} size={"icon"} onClick={togglePlayPause}>
                    {isPlaying ? (<Pause className="text-[#3D3D3D]" fill="#3D3D3D" size={16} />) : (<Play className="text-[#3D3D3D]" fill="#3D3D3D" size={16} />)}
                </Button>
                <Button variant={"ghost"} size={"icon"} onClick={handleReset}>
                    <Square className="text-[#3D3D3D]" fill="#3D3D3D" size={16} />
                </Button>
            </div>
            <div className="flex justify-center items-center  gap-x-[7px]">
                <span className="font-iranyekan-light text-[#3D3D3D]">{formatTime(currentTime)}</span>
                <Slider min={0} max={duration} value={[currentTime]} step={1} className="w-[319px] [&>span]:bg-#C6C6C6 " />
            </div>

            <div className="flex justify-center items-center w-full gap-x-[7px]">
                <Slider defaultValue={[1]}
                    max={1}
                    min={0}
                    step={0.1}
                    value={[volume]}
                    onValueChange={handleVolumeChange} className="w-[90px] [&>span]:bg-#C6C6C6 " />
                <Volume2 className="text-[#3D3D3D]" floodColor="#3D3D3D" fill="#3D3D3D" size={16} />
            </div>
            <audio ref={audioRef} src="/src/assets/simple-logo-149190.mp3" />
        </div>
    );
};

export default AudioPlayer;
