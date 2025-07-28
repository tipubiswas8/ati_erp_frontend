<template>
    <div class="items-center mt-6 flex-wrap gap-2" style="display: flex; justify-content: center;">
        <!-- Print Button -->
        <div>
            <button @click="print" class="export-btn print-btn">
                <i class="fas fa-print mr-1"></i> Print
            </button>
        </div>

        <!-- CSV Button -->
        <div>
            <button @click="exportCSV" class="export-btn csv-btn">
                <i class="fas fa-file-csv mr-1"></i> CSV
            </button>
        </div>

        <!-- PDF Button -->
        <div>
            <button @click="exportPDF" class="export-btn pdf-btn">
                <i class="fas fa-file-pdf mr-1"></i> PDF
            </button>
        </div>

        <!-- Excel Button -->
        <div>
            <button @click="exportExcel" class="export-btn excel-btn">
                <i class="fas fa-file-excel mr-1"></i> Excel
            </button>
        </div>

        <!-- Visibility Toggle with Dropdown -->
        <div class="relative flex items-center space-x-2">
            <button ref="toggleButton" @click.stop="toggleVisibilityMenu" class="export-btn visibility-btn">
                <i class="fas fa-eye mr-1"></i> Columns
            </button>

            <div v-if="showVisibilityMenu" ref="dropdownMenu"
                class="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-lg z-50 border border-gray-200 transform origin-top transition-all duration-200 ease-out"
                :class="showVisibilityMenu ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
                <label v-for="header in tableHeaders" :key="header.id"
                    class="flex items-center px-4 py-2 cursor-pointer transition-colors duration-150 group" :class="{
                        'bg-emerald-100': header.visibility,  // Checked state - emerald background
                        'hover:bg-amber-50': !header.visibility  // Unchecked hover - amber background
                    }">
                    <div class="flex items-center h-5">
                        <input type="checkbox" :id="'col-' + header.key" v-model="header.visibility"
                            class="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer opacity-0 absolute">
                        <div class="flex items-center justify-center w-4 h-4 border-2 rounded transition-all duration-150"
                            :class="{
                                'bg-indigo-600 border-indigo-600': header.visibility,  // Checked - indigo
                                'border-gray-300 group-hover:border-amber-400': !header.visibility  // Unchecked hover - amber border
                            }">
                            <svg v-if="header.visibility" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-700 cursor-pointer select-none" :class="{
                        'text-indigo-800': header.visibility  // Darker text for checked items
                    }">
                        {{ header.label }}
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useToast } from "vue-toastification";

const toast = useToast();
const showVisibilityMenu = ref(false);
const toggleButton = ref<HTMLElement | null>(null);
const dropdownMenu = ref<HTMLElement | null>(null);

const props = defineProps({
    originalData: {
        type: Array,
        required: true,
    },
    filteredData: {
        type: Array,
        required: false,
        default: () => []
    },
    tableHeaders: {
        type: Array,
        required: true
    },
    reportTitle: {
        type: Object,
        required: false,
        default: () => ({
            title: 'Data Report',
            fileName: 'report'
        })
    }
})

const toggleVisibilityMenu = () => {
    showVisibilityMenu.value = !showVisibilityMenu.value;
};

const handleClickOutside = (event: MouseEvent) => {
    if (
        showVisibilityMenu.value &&
        toggleButton.value &&
        dropdownMenu.value &&
        !toggleButton.value.contains(event.target as Node) &&
        !dropdownMenu.value.contains(event.target as Node)
    ) {
        showVisibilityMenu.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const print = () => {
    const dataToExport = props.filteredData.length > 0 ? props.filteredData : props.originalData;

    if (dataToExport.length === 0 || !props.tableHeaders.some(header => header.visibility)) {
        toast.warning("No data to print");
        return;
    }

    const printWindow = window.open('', '', 'width=800,height=600');
    const visibleColumns = props.tableHeaders.filter(header => header.visibility);

    const tableHeaders = visibleColumns.map(header =>
        `<th>${header.label}</th>`
    ).join('');

    const tableRows = dataToExport.map(trData => {
        return `<tr>${visibleColumns.map(header =>
            `<td>${trData[header.key] || ''}</td>`
        ).join('')
            }</tr>`;
    }).join('');

    const tableHtml = `
    <html>
      <head>
        <title>Print Table</title>
        <style>
          body { font-family: Arial; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .print-title { text-align: center; margin-bottom: 5px; }
          .print-subtitle { text-align: center; color: #666; margin-bottom: 20px; }
          .print-date { text-align: right; margin-bottom: 10px; color: #666; }
          .print-info { 
            margin-bottom: 15px; 
            padding: 10px; 
            background-color: #f8f8f8; 
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <h1 class="print-title">${props.reportTitle.title}</h1>
        <div class="print-subtitle">${props.filteredData.length > 0 ? 'Filtered Results' : 'All Results'}</div>
        <div class="print-date">Generated on ${new Date().toLocaleString()}</div>
        
        <div class="print-info">
          Showing ${dataToExport.length} of ${props.originalData.length} total records<br>
          Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
        </div>
        
        <table>
          <thead>
            <tr>${tableHeaders}</tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `;

    printWindow.document.write(tableHtml);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
        printWindow.print();
        setTimeout(() => printWindow.close(), 1000);
    }, 500);
};

const exportPDF = async () => {
    const dataToExport = props.filteredData.length > 0 ? props.filteredData : props.originalData;

    if (dataToExport.length === 0 || !props.tableHeaders.some(header => header.visibility)) {
        toast.warning("No data to export");
        return;
    }

    try {
        const { jsPDF } = await import('jspdf');
        const autoTable = await import('jspdf-autotable');

        const doc = new jsPDF();
        const headers = props.tableHeaders
            .filter(header => header.visibility)
            .map(header => ({
                title: header.label,
                dataKey: header.key
            }));

        const data = dataToExport.map(trData => {
            const row = {};
            headers.forEach(header => {
                row[header.dataKey] = trData[header.dataKey] || '';
            });
            return row;
        });

        doc.text(`${props.filteredData.length > 0 ? 'Filtered' : 'All'} ${props.reportTitle.title}`, 14, 10);
        autoTable.default(doc, {
            head: [headers.map(h => h.title)],
            body: data.map(row => headers.map(h => row[h.dataKey])),
            startY: 20,
            styles: { fontSize: 9 }
        });

        doc.save(`${props.reportTitle.fileName}_${props.filteredData.length > 0 ? 'filtered' : 'all'}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
        console.error('PDF export error:', error);
        toast.error("Failed to generate PDF");
    }
};

const exportCSV = () => {
    const dataToExport = props.filteredData.length > 0 ? props.filteredData : props.originalData;

    if (dataToExport.length === 0 || !props.tableHeaders.some(header => header.visibility)) {
        toast.warning("No data to export");
        return;
    }

    const visibleHeaders = props.tableHeaders.filter(header => header.visibility);

    // Use header labels for CSV header row
    const headerRow = visibleHeaders.map(header => header.label);

    const csvContent = [
        headerRow.join(','),
        ...dataToExport.map(trData =>
            visibleHeaders.map(header => {
                const value = trData[header.key] || '';
                return `"${String(value).replace(/"/g, '""')}"`;
            }).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${props.reportTitle.fileName}_${props.filteredData.length > 0 ? 'filtered' : 'all'}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
};

const exportExcel = async () => {
    const dataToExport = props.filteredData.length > 0 ? props.filteredData : props.originalData;

    if (dataToExport.length === 0 || !props.tableHeaders.some(header => header.visibility)) {
        toast.warning("No data to export");
        return;
    }

    try {
        const XLSX = await import('xlsx');
        const visibleHeaders = props.tableHeaders.filter(header => header.visibility);

        // Create worksheet with headers
        const wsData = [
            visibleHeaders.map(header => header.label), // Header row with labels
            ...dataToExport.map(trData =>
                visibleHeaders.map(header => trData[header.key] || '')
            )
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(wsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, props.filteredData.length > 0 ? 'Filtered ' + props.reportTitle.title : 'All ' + props.reportTitle.title);
        XLSX.writeFile(workbook, `${props.reportTitle.fileName}_${props.filteredData.length > 0 ? 'filtered' : 'all'}_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (error) {
        console.error('Excel export error:', error);
        toast.error("Failed to generate Excel file");
    }
};

</script>

<style>
.export-btn {
    @apply p-2 rounded-lg transition-all duration-200 flex items-center;
    min-width: 90px;
    justify-content: center;
}

.print-btn {
    @apply bg-blue-100 text-blue-800 hover:bg-blue-200;
}

.csv-btn {
    @apply bg-green-100 text-green-800 hover:bg-green-200;
}

.pdf-btn {
    @apply bg-red-100 text-red-800 hover:bg-red-200;
}

.excel-btn {
    @apply bg-emerald-100 text-emerald-800 hover:bg-emerald-200;
}

.visibility-btn {
    @apply bg-purple-100 text-purple-800 hover:bg-purple-200;
}
</style>