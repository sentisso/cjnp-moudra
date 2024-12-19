import { useState } from 'react'
import axios from "axios";

interface AnswerResponse {
	isValid: boolean
	message: string
	secret?: string
}

function App() {
	const serverClient = axios.create({
		baseURL: process.env.REACT_APP_SERVER_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const [response, setResponse] = useState<AnswerResponse | null>(null);
	const [answer, setAnswer] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleAnswer = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setResponse(null);

		try {
			const response = await serverClient.post('/answers/validate', {
				answer: answer,
			});
			console.log(response.data)
			setResponse(response.data);
		} catch (error) {
			console.error('Error submitting answer:', error);
			setResponse({
				isValid: false,
				message: 'An error occurred while submitting your answer'
			  });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-2 py-4 sm:px-4 sm:py-8">
			<div className="pufek-bounce">
				<img 
					src="/pufekFlying.gif" 
					alt="Pufek flying" 
					className="w-12 h-12 sm:w-16 sm:h-16"
				/>
			</div>

			<form
				onSubmit={handleAnswer}
				className="bg-gray-700 p-4 sm:p-8 rounded-lg shadow-xl w-full sm:max-w-lg border border-gray-600"
			>
				<div className="mb-4 sm:mb-6">
					<input
						id="answer"
						type="text"
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}
						className="w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md 
			               text-gray-200 placeholder-gray-400
			               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
			               text-base"
						placeholder="Enter your křížovka answer"
						required
						autoComplete="off"
					/>
					<p className="mt-2 text-sm text-gray-400">
						{'No diakritika (e.g. "chlebíčky a brána" -> "chlebicky a brana")'}
					</p>
				</div>
        
				<button
					type="submit"
					disabled={isLoading}
					className={`w-full bg-blue-600 text-gray-50 py-2.5 px-4 rounded-md 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 
                     transition-colors text-base
                     ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
				>
					{isLoading ? (
						<div className="flex items-center justify-center">
							<div className="w-5 h-5 border-t-2 border-gray-50 border-solid rounded-full animate-spin mr-2" />
                            Submitting...
						</div>
					) : (
						'Submit Křížovka Answer'
					)}
				</button>

				{response && (
					<div className={`mt-4 p-3 rounded-md ${
						response.isValid 
							? 'bg-green-900/50 text-green-200' 
							: 'bg-red-900/50 text-red-200'
					}`}>
						{response.message}
					</div>
				)}
			</form>
		</div>
	)
}

export default App