import { createSignal, createEffect, createResource, For, Show, untrack } from "solid-js";
import { useKeyDownEvent } from "@solid-primitives/keyboard";
import { AddScript } from "./AddScript";
import { getScripts, getRandomScript } from "./firebase";
import './TypingPrompt.css';

const getRandomInitialWords = async () => {
    console.log('get random words');
    let script = await getRandomScript();
    console.log(script);
    // [{answer: 'W', typed: ''},]
    let chars = script.text.split('').map((c) => {
        return { answer: c, typed: '', style: 'char-neutral' };
    });
    chars[0].style = 'char-cursor';
    chars.push({isEnd: true});
    return chars;
};

export function TypingPrompt() {
    const [awaitScript, setAwaitScript] = createSignal({});
    const [script] = createResource(awaitScript, getRandomScript);

    console.log('get random words ' + script.loading);
    console.log(script());
    // [{answer: 'W', typed: ''},]
    let initChars = script().text.split('').map((c) => {
        return { answer: c, typed: '', style: 'char-neutral' };
    });
    initChars[0].style = 'char-cursor';
    initChars.push({isEnd: true});

    console.log(initChars);
    const [chars, setChars] = createSignal([{answer:'t', typed:''}]);
    const [showPrompt, setShowPrompt] = createSignal(true);
    const togglePrompt = () => {
        setShowPrompt(!showPrompt());
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
                const typed = charsCopy[i].typed + e.key;
                const style = charsCopy[i].answer === e.key ? 'char-correct' : 'char-incorrect';
                const char = {...charsCopy[i], typed: typed, style: style};
                const charCursor = {...charsCopy[i +1], style: 'char-cursor'};
                // console.log(char);
                // console.log(charCursor);
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
                    // console.log(char);
                    // console.log(charCursor);
                    setChars(charsCopy.toSpliced(i, 2, charCursor, char));
                } else if (charsCopy[i+1].isEnd) {
                    const charCursor = {...charsCopy[i], style: 'char-cursor'};
                    setChars(charsCopy.toSpliced(i, 1, charCursor));
                    // console.log(charsCopy);
                }
            }
            console.log(i);
        }
    });

    return (
        <>
            <Show when={!script.loading} fallback={<div>Script is loading</div>}>
                {script()}
            </Show>
            <Show when={showPrompt()} fallback={<AddScript />}>
                <For each={chars()}>
                    {(char) => {
                        return (<span class={char.style}>{char.answer}</span>);
                    }}
                </For>
            </Show>
            <div>
                <button onClick={togglePrompt}>Toggle Prompt</button>
            </div>
        </>
    );
}