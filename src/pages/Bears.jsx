import useBears from "../hooks/bears";

const Bears = () => {
    const bears = useBears((state) => state.bears);
    const {increasePopulation, removeAllBears, updateBears} = useBears((state) => state);
    return (
        <div className={`Bears`}>
            <section>{bears}</section>
            <button onClick={increasePopulation}>증가</button>
            <button onClick={removeAllBears}>멸종</button>
            <section>안녕!</section>
        </div>
    )
}

export default Bears;