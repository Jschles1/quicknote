export interface ReactFCWithWDYR<P = Record<string, never>> extends React.FC<P> {
    whyDidYouRender?: boolean;
}
