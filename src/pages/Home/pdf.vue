<template>
    <div>
        <q-card>
            
        </q-card>
        <button @click="createPdf">generate PDF</button>
    </div>
</template>

<script>
import { jsPDF } from "jspdf"


export default {
    setup() {
        const createPdf = () => {
             // Landscape export, 2×4 inches
                const doc = new jsPDF({
                orientation: "landscape",
                unit: "in",
                format: [4, 2]
            })
            doc.text("Hello world!", 1, 1)
            doc.save("two-by-four.pdf")
        }

        return{
            createPdf
        }
    }
}
</script>