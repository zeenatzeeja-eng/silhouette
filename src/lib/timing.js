// Temporary: kaunsa step kitna time le raha hai, ye dekhne ke liye
export async function timed(label, fn) {
	const start = performance.now();
	try {
		return await fn();
	} finally {
		console.log(`TIMING ${label}: ${(performance.now() - start).toFixed(0)}ms`);
	}
}
