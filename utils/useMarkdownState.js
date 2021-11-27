export default function useMarkdownState() {
    let state = []
    const pushState = ({data, type, map: {start, end}, children, hidden, nesting, level}) => {
        state.push({
            content: data,
            type: type,
            map: {start: start, end: end},
            children: children ? children : [],
            hidden: hidden,
            nesting: nesting,
            level: level
        })
    }


    return {pushState, state, lastState: (state.length > 0 ? state[state.length - 1] : null)}
}