import React from 'react';

const posts = [
	{
		title: 'The Secret to Our Famous Kota',
		date: 'July 24, 2025',
		excerpt:
			'Discover the fresh ingredients and secret spices that make our Kotas the talk of the town...',
	},
	{
		title: '5 Tips for a Sparkling Clean Car',
		date: 'July 20, 2025',
		excerpt: 'Learn our top tips for maintaining a pristine car between professional washes...',
	},
	{
		title: 'Community Day at Central Eatery',
		date: 'July 15, 2025',
		excerpt:
			'A look back at our recent community event, filled with good food and great company...',
	},
];

const BlogPostList: React.FC = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2  gap-6'>
			{posts.map((post, index) => (
				<div
					key={index}
					className='bg-black/50 p-6 rounded-md shadow-lg hover:shadow-red-500/50 transition-shadow duration-300'>
					<h3 className='text-xl font-bold mb-2'>{post.title}</h3>
					<p className='text-sm text-white mb-2'>{post.date}</p>
					<p className='text-white'>{post.excerpt}</p>
				</div>
			))}
		</div>
	);
};

export default BlogPostList;
