/**
 * @file Datetime.
 * @description Helpers built on the native Temporal API for formatting dates across the app.
 */
import type { firebase } from '@/firebase/init';

/**
 * Formats a Firestore Timestamp as a locale-aware date/time string.
 * @param timestamp - The Firestore Timestamp to format.
 * @returns The formatted date/time string.
 */
const formatFirestoreTimestamp = (timestamp: firebase.firestore.Timestamp): string =>
    Temporal.Instant.fromEpochMilliseconds(timestamp.seconds * 1000).toLocaleString();

export { formatFirestoreTimestamp };
