import Section from '@/components/ui/layout/Section';

const TermsContent: React.FC = () => {
	return (
		<Section>
			<div className='bg-red-700 p-6 sm:p-8 rounded-md text-white'>
				<header className='text-center mb-8'>
					<h1
						className='text-3xl sm:text-4xl font-bold'
						style={{ filter: 'drop-shadow(0 0 4px #ff0000)' }}>
						Terms and Conditions
					</h1>
					<p className='text-white mt-2'>Last updated: July 24, 2024</p>
				</header>

				<div className='space-y-6'>
					<div className='bg-black/20 p-4 rounded-md'>
						<h2 className='text-xl font-semibold mb-3'>1. Introduction</h2>
						<p className='text-white'>
							Welcome to Central Eatery. These terms and conditions outline the rules and
							regulations for the use of our services. By accessing this website and using our
							services, you accept these terms and conditions in full.
						</p>
					</div>

					<div className='bg-black/20 p-4 rounded-md'>
						<h2 className='text-xl font-semibold mb-3'>2. User Responsibilities</h2>
						<p className='text-white mb-2'>
							You are responsible for ensuring that your account information is accurate and for
							maintaining the confidentiality of your password. You agree to accept responsibility
							for all activities that occur under your account.
						</p>
						<ul className='list-disc list-inside space-y-1 text-white pl-2'>
							<li>You must not misuse our services.</li>
							<li>You must not attempt to gain unauthorized access to our systems.</li>
							<li>You must comply with all applicable laws and regulations.</li>
						</ul>
					</div>

					<div className='bg-black/20 p-4 rounded-md'>
						<h2 className='text-xl font-semibold mb-3'>3. Limitation of Liability</h2>
						<p className='text-white'>
							In no event shall Central Eatery, nor any of its officers, directors, and employees,
							be liable to you for anything arising out of or in any way connected with your use of
							this website, whether such liability is under contract, tort or otherwise.
						</p>
					</div>

					<div className='bg-black/20 p-4 rounded-md'>
						<h2 className='text-xl font-semibold mb-3'>4. Governing Law</h2>
						<p className='text-white'>
							These Terms will be governed by and construed in accordance with the laws of South
							Africa, and you submit to the non-exclusive jurisdiction of the state and federal
							courts located in Limpopo for the resolution of any disputes.
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default TermsContent;
