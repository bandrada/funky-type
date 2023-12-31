import { createSignal, For } from "solid-js";
const words = 'Words to see and type. Just as they appear.';
// [{answer: 'W', typed: ''},]
const initChars = words.split('').map((c) => {
    return { answer: c, typed: '' };
});

export function TypingPrompt() {
    const [chars, setChars] = createSignal(initChars);
    return (
        <For each={chars()}>
            {(char) => <div>{char.answer}</div>}
        </For>
    );
}