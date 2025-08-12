import { IHeaderProps } from "../../utils/types";

export default function DefaultHeaderTitle(props: IHeaderProps) {
    return (
        <div className="mb-8 text-secondary">
            <h3 className="text-2xl">
                {props.title}
            </h3>
            <p>
                {props.content}
            </p>
        </div>
    );
}