import AnimatedText from "../../atoms/animatedText/animatedText";

export default function MobileHeaderStack({ 
    text = null,
    number="1",
    name="tora",
    gridColumn="1 / 5",
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', gridColumn: gridColumn}}>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <h4>0{number}.</h4>
                <h2 style={{marginBottom: "-2%"}}>{name}</h2>
            </div>
            {text && (
                <div>
                    <AnimatedText text={text} />
                </div>
            )}
        </div>
    );
}