import { render, waitFor } from "@testing-library/react"
import { motion } from "framer-motion"
import { Activity } from "react"

function Panel({ shown, active }: { shown: boolean; active: boolean }) {
    return (
        <Activity mode={shown ? "visible" : "hidden"}>
            <motion.div
                data-testid="box"
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 1 : 0 }}
            />
        </Activity>
    )
}

test("animate prop changed while hidden is used on reveal", async () => {
    const { rerender, getByTestId } = render(<Panel shown={false} active={false} />)
    rerender(<Panel shown={false} active />)
    rerender(<Panel shown active />)
    await waitFor(() => expect(getByTestId("box").style.opacity).toBe("1"))
})

test("control: the same change made while visible works", async () => {
    const { rerender, getByTestId } = render(<Panel shown active={false} />)
    rerender(<Panel shown active />)
    await waitFor(() => expect(getByTestId("box").style.opacity).toBe("1"))
})
