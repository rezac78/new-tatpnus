/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import * as React from 'react';

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,

} from 'react';


import FlashMessage from '../ui/FlashMessage';

export type ShowFlashMessage = (
    message?: ReactNode,
    duration?: number,
) => void;

interface FlashMessageProps {
    message?: ReactNode;
    duration?: number;
}

const Context = createContext<ShowFlashMessage | undefined>(undefined);
const INITIAL_STATE: FlashMessageProps = {};
const DEFAULT_DURATION = 1000;

export const FlashMessageContext:any = ({
                                        children,
                                    }:any) => {
    const [props, setProps] = useState(INITIAL_STATE);
    const showFlashMessage = useCallback<ShowFlashMessage>(
        (message, duration) =>
            setProps(message ? {duration, message} : INITIAL_STATE),
        [],
    );
    useEffect(() => {
        if (props.message) {
            const timeoutId = setTimeout(
                () => setProps(INITIAL_STATE),
                props.duration ?? DEFAULT_DURATION,
            );
            return () => clearTimeout(timeoutId);
        }
    }, [props]);
    return (
        <Context.Provider value={showFlashMessage}>
            {children}
             {/*@ts-ignore*/}
            {props.message && <FlashMessage>{props.message}</FlashMessage>}
        </Context.Provider>
    );
};

export const useFlashMessageContext = (): ShowFlashMessage => {
    const ctx = useContext(Context);
    if (!ctx) {
        throw new Error('Missing FlashMessageContext');
    }
    return ctx;
};
