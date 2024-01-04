import { createSignal } from 'solid-js';
import { addScript } from './firebase';

const emptyScript = { title: '', text: '' };

export function AddScript() {
    const [script, setScript] = createSignal(emptyScript);
    const addScriptHandler = async () => {
        console.log(script());
        await addScript(script());
        console.log('added');
    }

    return (
        <div>
            <div>Title</div>
            <input value={script().title} onInput={(e) => { setScript({...script(), title: e.currentTarget.value })}}></input>
            <div>Text</div>
            <textarea value={script().text} onInput={(e) => { setScript({...script(), text: e.currentTarget.value })}}></textarea>
            <div>
                <button onClick={addScriptHandler}>Add script</button>
            </div>
        </div>
        // <form>
        //     <div>
        //         <label for='title'>Title</label>
        //         <input 
        //             id='title' 
        //             value={script().title}
        //             onInput={(e) => {
        //                 setScript({...script(), title: e.currentTarget.value });
        //             }}
        //         />
        //     </div>
        //     <div>
        //         <label for='text'>Text</label>
        //         <input 
        //             id='text' 
        //             value={script().text}
        //             onInput={(e) => {
        //                 setScript({...script(), text: e.currentTarget.value });
        //             }}
        //         />
        //     </div>
        //     <button type='submit' onClick={addScriptHandler}>
        //         Add Script
        //     </button>
        // </form>
    );
}