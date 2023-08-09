
export default function PostTag({ text }: { text: string }) {
    return <div className="p-2 flex justify-center items-center font-thin text-xs sm:text-sm bg-gray-800 rounded-md hover:bg-gray-700">{text}</div>
}