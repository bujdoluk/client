/**
 * @file Minimal ambient declarations for the native Temporal global.
 * @description Temporal ships natively in modern browsers (Chrome 144+, Firefox 139+, Edge 144+)
 * as of 2026, so no runtime polyfill is bundled. These types only cover the subset of the API
 * used in this app; extend as needed.
 * @see https://tc39.es/proposal-temporal/docs/
 */
declare namespace Temporal {
    class Instant {
        /**
         * Creates a Temporal.Instant from a number of milliseconds since the Unix epoch.
         * @param epochMilliseconds - Number of milliseconds since the Unix epoch.
         * @returns A new Temporal.Instant representing that point in time.
         */
        static fromEpochMilliseconds(epochMilliseconds: number): Instant;

        /**
         * Formats this instant as a locale-aware date/time string.
         * @param locales - A locale or list of locales to format with.
         * @param options - Intl.DateTimeFormat options controlling the output.
         * @returns The formatted date/time string.
         */
        toLocaleString(locales?: string | Array<string>, options?: Intl.DateTimeFormatOptions): string;
    }

    class PlainDate {
        /** The calendar year. */
        readonly year: number;

        /** The calendar month (1-12). */
        readonly month: number;

        /** The calendar day of the month. */
        readonly day: number;
    }

    class ZonedDateTime {
        /** The UTC offset of this zoned date-time, e.g. "+02:00". */
        readonly offset: string;
    }

    namespace Now {
        /**
         * Returns the current date in the ISO 8601 calendar, in the given or system time zone.
         * @param timeZone - An optional IANA time zone identifier; defaults to the system time zone.
         * @returns The current Temporal.PlainDate.
         */
        function plainDateISO(timeZone?: string): PlainDate;

        /**
         * Returns the current date and time in the ISO 8601 calendar, in the given or system time zone.
         * @param timeZone - An optional IANA time zone identifier; defaults to the system time zone.
         * @returns The current Temporal.ZonedDateTime.
         */
        function zonedDateTimeISO(timeZone?: string): ZonedDateTime;
    }
}
