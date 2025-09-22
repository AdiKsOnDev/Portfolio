"use client"
import { ProjectScrollCard, ProjectData } from './ScrollCard'

/**
 * WorkSection - Enhanced portfolio projects showcase component
 *
 * Displays a responsive grid of project cards featuring technology stacks,
 * descriptions, and interactive hover effects. Enhanced with proper semantic
 * structure, ARIA labels, and improved typography hierarchy for accessibility.
 *
 * @returns JSX element containing the work section with project cards grid
 */
export function WorkSection() {
  // Project portfolio data with more realistic project information
  // Each project includes representative technologies and detailed descriptions
  const projects: ProjectData[] = [
    {
      id: 1,
      title: 'Neural Style Transfer Engine',
      description:
        'Advanced deep learning system for artistic style transfer using convolutional neural networks. Implements optimization algorithms for real-time style synthesis with conventional code architecture.',
      tags: ['PyTorch', 'Computer Vision', 'CNN', 'CUDA'],
    },
    {
      id: 2,
      title: 'Automated ML Pipeline',
      description:
        'Production-grade MLOps platform with automated feature engineering, model selection, and deployment. Emphasizes conventional code practices and robust automation workflows.',
      tags: ['MLOps', 'Kubernetes', 'Python', 'CI/CD'],
    },
    {
      id: 3,
      title: 'NLP Research Framework',
      description:
        'Research-oriented natural language processing framework for transformer architectures. Built with conventional coding principles and extensive automation for reproducible research.',
      tags: ['Transformers', 'BERT', 'Hugging Face', 'Research'],
    },
    {
      id: 4,
      title: 'Reinforcement Learning Agent',
      description:
        'Deep Q-learning implementation for autonomous decision-making systems. Focuses on conventional code structure and automated training pipelines for reliable AI agents.',
      tags: ['RL', 'DQN', 'OpenAI Gym', 'TensorFlow'],
    },
  ]

  return (
    <section
      id="work"
      className="section bg-background"
      role="region"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <h2
          id="work-heading"
          className="text-accent font-bold text-center mb-12"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: '1.2',
          }}
        >
          Work & Projects
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectScrollCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
