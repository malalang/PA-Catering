import React from 'react';
import BlogPostList from '@/features/blog/components/BlogPostList';
import Main from '@/components/ui/layout/Main';
import { FaBlog } from 'react-icons/fa';
import Section from '@/components/ui/layout/Section';

const BlogNewsPage: React.FC = () => {
	return (
		<Main
			tittle='Blog'
			Icon={FaBlog}>
			<Section>
				<BlogPostList />
			</Section>
		</Main>
	);
};

export default BlogNewsPage;
