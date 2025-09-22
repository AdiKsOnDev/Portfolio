"use client"
import { PublicationScrollCard, PublicationData } from './ScrollCard'

/**
 * PublicationsSection - Enhanced academic publications showcase component
 *
 * Displays academic papers, conference presentations, and research publications
 * in a clean, citation-style format. Enhanced with proper semantic structure,
 * ARIA labels, and improved typography hierarchy for accessibility.
 *
 * PLACEHOLDER DATA NOTE:
 * The publications data in this component contains realistic sample publications
 * for portfolio demonstration purposes. In a production implementation, this would
 * typically be replaced with:
 * - CMS integration (Strapi, Contentful, etc.)
 * - API calls to academic databases (ORCID, Google Scholar)
 * - Static import from JSON/YAML files
 * - Database queries for dynamic content management
 *
 * IMPACT METRICS EXPLANATION:
 * Citation counts, impact factors, and journal rankings are randomly generated
 * using realistic ranges to demonstrate the visual presentation. Production
 * implementation would integrate with services like CrossRef, Scopus, or
 * Web of Science for real academic metrics.
 *
 * @returns JSX element containing the publications section with academic work listing
 */
export function PublicationsSection() {
  // Academic publications data with AI/ML research focus
  // Format follows standard academic citation styles
  const publications: PublicationData[] = [
    {
      id: 1,
      title: 'Automated Feature Engineering for Deep Learning Models Using Conventional Code Practices',
      journal: 'Nature Machine Intelligence',
      year: '2024',
      authors: 'Adil Alizada, Dr. Elena Petrov, Michael Zhang',
      abstract:
        'This paper presents a novel automated feature engineering framework that leverages conventional code practices to improve deep learning model performance. Our methodology demonstrates 35% accuracy improvements while maintaining code maintainability and reducing technical debt in ML pipelines.',
    },
    {
      id: 2,
      title: 'Reproducible Machine Learning Pipelines: A Framework for Automated Experimentation',
      journal: 'International Conference on Machine Learning (ICML)',
      year: '2024',
      authors: 'Adil Alizada, Sarah Chen, Dr. James Rodriguez',
      abstract:
        'We introduce a comprehensive framework for building reproducible ML experimentation pipelines using automation and conventional code principles. Our approach ensures consistent results across environments while reducing manual intervention by 80% in model development workflows.',
    },
    {
      id: 3,
      title: 'Efficient Neural Architecture Search with Automated Hyperparameter Optimization',
      journal: 'IEEE Transactions on Neural Networks and Learning Systems',
      year: '2023',
      authors: 'Adil Alizada, Dr. Maria Thompson, Alex Kim, Prof. David Liu',
      abstract:
        'This research examines efficient neural architecture search techniques combined with automated hyperparameter optimization. We demonstrate significant computational cost reductions while achieving state-of-the-art performance on computer vision benchmarks, with particular emphasis on automation-driven model selection.',
    },
  ]

  return (
    <section
      id="publications"
      className="section bg-background"
      role="region"
      aria-labelledby="publications-heading"
    >
      <div className="container">
        <h2
          id="publications-heading"
          className="text-accent font-bold text-center mb-12"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: '1.2',
          }}
        >
          Publications
        </h2>

        <div className="max-w-5xl mx-auto space-y-8">
          {publications.map((publication, index) => (
            <PublicationScrollCard
              key={publication.id}
              publication={publication}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
