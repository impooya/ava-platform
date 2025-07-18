import ArchiveTable from "@/components/archive-table"

function ArchivePage() {
    return (
        <div className="w-full  pr-[320px] pl-[104px]">
            <div className="flex justify-start items-start mb-[42px]">
                <h1 className="font-iranyekan-regular text-[#00BA9F] text-2xl">آرشیو من</h1>
            </div>
            <ArchiveTable />
        </div>
    )
}

export default ArchivePage