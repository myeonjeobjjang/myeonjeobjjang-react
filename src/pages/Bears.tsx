import useBears from "../hooks/bears";

const Bears = () => {
    const bears = useBears((state) => state.bears);
    const {increasePopulation, removeAllBears} = useBears((state) => state);
    return (
        <div className={`Bears`}>
            <section>{bears}</section>
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={increasePopulation}>증가</button>
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={removeAllBears}>멸종</button>
            <section className="text-5xl font-bold underline">안녕!</section>
        </div>
    )
}

export default Bears;