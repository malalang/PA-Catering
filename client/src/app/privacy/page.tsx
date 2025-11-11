import Main from '@/components/ui/layout/Main';
import Section from '@/components/ui/layout/Section';

const PrivacyPolicyPage: React.FC = () => {
	return (
		<Main tittle='Privacy Policy'>
			<Section>
				<div className='space-y-6'>
					<p>Effective Date: 26 July 2024</p>

					<article>
						<h2 className='text-2xl font-semibold mb-2'>1. Introduction</h2>
						<p>
							Welcome to Central Eatery PTY Ltd. We are committed to protecting your privacy and
							ensuring that your personal information is handled in a safe and responsible manner.
							This Privacy Policy outlines how we collect, use, disclose, and safeguard your
							information when you use our services, including our website and digital booking
							system.
						</p>
					</article>

					<article>
						<h2 className='text-2xl font-semibold mb-2'>2. Information We Collect</h2>
						<p>
							We may collect information about you in a variety of ways. The information we may
							collect includes:
						</p>
						<h3 className='text-xl font-semibold mt-4 mb-2'>Personal Data</h3>
						<p>
							Personally identifiable information, such as your name, email address, and telephone
							number, that you voluntarily give to us when you use our digital booking system or
							contact us.
						</p>
						<h3 className='text-xl font-semibold mt-4 mb-2'>Usage Data</h3>
						<p>
							Information that our servers automatically collect when you access our website, such
							as your IP address, browser type, operating system, access times, and the pages you
							have viewed directly before and after accessing the site.
						</p>
					</article>

					<article>
						<h2 className='text-2xl font-semibold mb-2'>3. How We Use Your Information</h2>
						<p>
							Having accurate information about you permits us to provide you with a smooth,
							efficient, and customized experience. Specifically, we may use information collected
							about you to:
						</p>
						<ul className='list-disc list-inside ml-4 mt-2'>
							<li>Manage your bookings and appointments for our car wash services.</li>
							<li>Send you confirmations, reminders, and updates regarding your bookings.</li>
							<li>Respond to your comments and questions and provide customer service.</li>
							<li>
								Monitor and analyze usage and trends to improve your experience with our services.
							</li>
							<li>Notify you of updates to our services.</li>
						</ul>
					</article>

					<article>
						<h2 className='text-2xl font-semibold mb-2'>4. Data Sharing and Disclosure</h2>
						<p>
							We do not share, sell, rent, or trade your personal information with third parties for
							their commercial purposes. We may share information we have collected about you in
							certain situations, such as:
						</p>
						<ul className='list-disc list-inside ml-4 mt-2'>
							<li>
								<strong>By Law or to Protect Rights:</strong> If we believe the release of
								information about you is necessary to respond to legal process, to investigate or
								remedy potential violations of our policies, or to protect the rights, property, and
								safety of others, we may share your information as permitted or required by any
								applicable law, rule, or regulation.
							</li>
							<li>
								<strong>Service Providers:</strong> We may share your information with third parties
								that perform services for us or on our behalf, including payment processing, data
								analysis, email delivery, hosting services, and customer service.
							</li>
						</ul>
					</article>

					<article>
						<h2 className='text-2xl font-semibold mb-2'>5. Data Security</h2>
						<p>
							We use administrative, technical, and physical security measures to help protect your
							personal information. While we have taken reasonable steps to secure the personal
							information you provide to us, please be aware that despite our efforts, no security
							measures are perfect or impenetrable, and no method of data transmission can be
							guaranteed against any interception or other type of misuse.
						</p>
					</article>

					<article>
						<h2 className='text-2xl font-semibold mb-2'>6. Your Rights</h2>
						<p>
							You have the right to access, correct, or delete your personal information. You may
							also have the right to object to or restrict certain processing of your data. To
							exercise these rights, please contact us using the contact information provided below.
						</p>
					</article>

					<article>
						<h2 className='text-2xl font-semibold mb-2'>7. Changes to This Privacy Policy</h2>
						<p>
							We may update this Privacy Policy from time to time in order to reflect, for example,
							changes to our practices or for other operational, legal, or regulatory reasons. We
							will notify you of any changes by posting the new Privacy Policy on this page.
						</p>
					</article>

					<article>
						<h2 className='text-2xl font-semibold mb-2'>8. Contact Us</h2>
						<p>
							If you have questions or comments about this Privacy Policy, please contact us at:
							<br />
							Central Eatery PTY Ltd
							<br />
							[Your Address Here]
							<br />
							Email: [Your Email Here]
							<br />
							Phone: [Your Phone Number Here]
						</p>
					</article>
				</div>
			</Section>
		</Main>
	);
};
export default PrivacyPolicyPage;
