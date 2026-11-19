export class DatesFormatter {

    getDate( format: string, days: number = 0, inputDate?: Date ): string {

        // If inputDate is provided, use it.
        // Otherwise, use current date.
        const date = inputDate ? new Date(inputDate) : new Date();

        // Add days only if required
        date.setDate(date.getDate() + days);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        const monthName = date.toLocaleString("en-US", {
            month: "short"
        });

        switch (format) {

            case "dd-MMM-yyyy":
                return `${day}-${monthName}-${year}`;

            case "dd/MM/yyyy":
                return `${day}/${month}/${year}`;

            case "dd-MM-yyyy":
                return `${day}-${month}-${year}`;

            case "yyyy-MM-dd":
                return `${year}-${month}-${day}`;

            default:
                throw new Error(`Invalid date format: ${format}`);
        }
    }
}