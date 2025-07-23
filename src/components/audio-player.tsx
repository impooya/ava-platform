import { intervalToDuration } from "date-fns";
import { Pause, Play, Square, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Slider, SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";
import { useDispatch, useSelector } from "react-redux";
import { currentTimeAction, setCurrentPlayingAudio } from "@/store/reducers/audio-reducer";
import type { RootState } from "@/store/store";

const AudioPlayer = ({ src, thumbColor, rangeColor, audioId }: {
    src: string,
    thumbColor?: string,
    rangeColor?: string,
    audioId: string // Make this required since we need unique IDs
}) => {
    const dispatch = useDispatch();
    const currentPlayingId = useSelector((state: RootState) => state.speech.currentPlayingId);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    // Check if this audio player is the currently playing one
    const isCurrentlyPlaying = currentPlayingId === audioId;

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('ended', handleAudioEnded);

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('ended', handleAudioEnded);
            };
        }
    });

    // Effect to handle when another audio starts playing
    useEffect(() => {
        if (currentPlayingId !== audioId && isPlaying) {
            // Another audio started playing, pause this one
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [currentPlayingId, audioId, isPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current && isCurrentlyPlaying) {
            setCurrentTime(audioRef.current.currentTime);
            dispatch(currentTimeAction(audioRef.current.currentTime));
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        dispatch(setCurrentPlayingAudio(null));
        dispatch(currentTimeAction(0));
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
                // Pause this audio
                audioRef.current.pause();
                setIsPlaying(false);
                dispatch(setCurrentPlayingAudio(null));
            } else {
                // Play this audio and set it as the currently playing one
                dispatch(setCurrentPlayingAudio(audioId));
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const formatTime = (timeInSeconds: number): string => {
        const duration = intervalToDuration({ start: 0, end: timeInSeconds * 1000 });
        return `${duration.minutes?.toString().padStart(2, '0') || '00'}:${duration.seconds?.toString().padStart(2, '0') || '00'}`;
    };

    const handleReset = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            audioRef.current.pause();
            setIsPlaying(false);
            dispatch(setCurrentPlayingAudio(null));
            dispatch(currentTimeAction(0));
        }
    };

    const handleSeek = (value: number[]) => {
        if (audioRef.current && isCurrentlyPlaying) {
            const newTime = value[0];
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    return (
        <div className="bg-[#F8F8F8] py-2.5 gap-x-[13px] px-2 rounded-[10px] w-auto flex justify-center items-center flex-row-reverse">
            <div className="flex justify-center items-center w-full gap-x-2">
                <Button variant={"ghost"} size={"icon"} onClick={togglePlayPause}>
                    {isPlaying ? (
                        <Pause className="text-[#3D3D3D]" fill="#3D3D3D" size={16} />
                    ) : (
                        <Play className="text-[#3D3D3D]" fill="#3D3D3D" size={16} />
                    )}
                </Button>
                <Button variant={"ghost"} size={"icon"} onClick={handleReset}>
                    <Square className="text-[#3D3D3D]" fill="#3D3D3D" size={16} />
                </Button>
            </div>

            <div className="flex justify-center items-center gap-x-[7px]">
                <span className="font-iranyekan-light text-[#3D3D3D]">
                    {formatTime(currentTime)}
                </span>
                <Slider
                    className="relative flex w-[319px] touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col"
                    defaultValue={[1]}
                    min={0}
                    max={duration}
                    onValueChange={handleSeek}
                    value={[currentTime]}
                    step={1}
                    disabled={!isCurrentlyPlaying} // Disable if not currently playing
                >
                    <SliderTrack className="bg-[#C6C6C6] relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
                        <SliderRange className={`bg-[${rangeColor ? rangeColor : "#118AD3"}] absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full`} />
                    </SliderTrack>
                    <SliderThumb className={`bg-[${thumbColor ? thumbColor : "#118AD3"}] border-[${thumbColor ? thumbColor : "#118AD3"}] ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50`} />
                </Slider>
            </div>

            <div className="flex justify-center items-center w-full gap-x-[7px]">
                <Slider
                    className="relative flex w-[90px] touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col"
                    defaultValue={[1]}
                    max={1}
                    min={0}
                    step={0.1}
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                >
                    <SliderTrack className="bg-[#C6C6C6] relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
                        <SliderRange className={`bg-[${rangeColor ? rangeColor : "#118AD3"}] absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full`} />
                    </SliderTrack>
                </Slider>
                <Volume2 className="text-[#3D3D3D]" floodColor="#3D3D3D" fill="#3D3D3D" size={16} />
            </div>

            <audio ref={audioRef} src={src} id={audioId} />
        </div>
    );
};

export default AudioPlayer;