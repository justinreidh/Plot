'use client'
import { Suspense } from 'react'
import {Document} from '../../components/Demo/DemoDoc'

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Document />
        </Suspense>
    )
}
