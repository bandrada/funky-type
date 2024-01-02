import { createSignal, createEffect, For, Show, untrack } from "solid-js";
import { useKeyDownEvent } from "@solid-primitives/keyboard";
import { AddScript } from "./AddScript";
import { getScripts } from "./firebase";
import './TypingPrompt.css';

const words = 'Words to see and type. Just as they appear.';
// [{answer: 'W', typed: ''},]
let initChars = words.split('').map((c) => {
    return { answer: c, typed: '', style: 'char-neutral' };
});

initChars[0].style = 'char-cursor';
initChars.push({isEnd: true});

export function TypingPrompt() {
    const [chars, setChars] = createSignal(initChars);
    const [showPrompt, setShowPrompt] = createSignal(false);
    const togglePrompt = () => {
        // setShowPrompt(!showPrompt());
        console.log('toggle prompt');
    }

    let i = 0;

    const event = useKeyDownEvent();
    createEffect(() => {
        const e = event();
        if (e && showPrompt()) {
            console.log(e.key);
            const charsCopy = untrack(() => chars());
            if (e.key.length === 1) {
                // set current spot to correct or incorrect
                // move forward one in the chars array
                // console.log(charsCopy);
                console.log(charsCopy);
                const typed = charsCopy[i].typed + e.key;
                const style = charsCopy[i].answer === e.key ? 'char-correct' : 'char-incorrect';
                const char = {...charsCopy[i], typed: typed, style: style};
                const charCursor = {...charsCopy[i +1], style: 'char-cursor'};
                console.log(char);
                console.log(charCursor);
                if(!charCursor.isEnd) {
                    setChars(charsCopy.toSpliced(i, 2, char, charCursor));
                    i++;
                } else {
                    setChars(charsCopy.toSpliced(i, 1, char));
                }
            } else if (e.key === 'Backspace') {
                // set current spot to neutral
                // move backward one in the chars array
                console.log(charsCopy[i  +1]);
                if(i > 0 && (!charsCopy[i+1].isEnd || charsCopy[i].style === 'char-cursor')) {
                    i--;
                    const char = {...charsCopy[i +1], style: 'char-neutral'};
                    const charCursor = {...charsCopy[i], style: 'char-cursor'};
                    console.log(char);
                    console.log(charCursor);
                    setChars(charsCopy.toSpliced(i, 2, charCursor, char));
                } else if (charsCopy[i+1].isEnd) {
                    const charCursor = {...charsCopy[i], style: 'char-cursor'};
                    setChars(charsCopy.toSpliced(i, 1, charCursor));
                    console.log(charsCopy);
                }
            }
            console.log(i);
        }
    });

    return (
        <>
            <Show when={showPrompt()} fallback={<AddScript />}>
                <For each={chars()}>
                    {(char) => {
                        return (<span class={char.style}>{char.answer}</span>);
                    }}
                </For>
            </Show>
            <button onClick={togglePrompt}>Toggle Prompt</button>
        </>
    );
}