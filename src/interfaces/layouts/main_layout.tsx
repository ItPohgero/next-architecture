'use client'
import React, { FC, Fragment, PropsWithChildren } from 'react'
import { ProviderReduxToolkit } from '../providers/redux_provider'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            <ProviderReduxToolkit>
                <main>{children}</main>
            </ProviderReduxToolkit>
        </Fragment>
    )
}

export default MainLayout