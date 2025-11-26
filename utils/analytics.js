/**
 * Analytics utility functions for tracking user interactions
 * Supports Google Analytics 4 (gtag) and custom event logging
 */

// Check if Google Analytics is available
const isGAAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track a generic event
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  try {
    if (isGAAvailable()) {
      window.gtag('event', eventName, eventParams);
    }
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', eventName, eventParams);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

/**
 * Track page views
 * @param {string} url - Page URL
 * @param {string} title - Page title
 */
export const trackPageView = (url, title) => {
  trackEvent('page_view', {
    page_path: url,
    page_title: title,
  });
};

/**
 * Track chatbot interactions
 */
export const trackChatbotOpen = () => {
  trackEvent('chatbot_opened', {
    event_category: 'engagement',
    event_label: 'Chatbot Interaction',
  });
};

export const trackChatbotQuestion = (question, responseTime) => {
  trackEvent('chatbot_question', {
    event_category: 'chatbot',
    event_label: question.substring(0, 100), // Limit length
    response_time_ms: responseTime,
  });
};

export const trackChatbotClose = (messagesCount, sessionDuration) => {
  trackEvent('chatbot_closed', {
    event_category: 'chatbot',
    messages_count: messagesCount,
    session_duration_seconds: Math.round(sessionDuration / 1000),
  });
};

/**
 * Track project interactions
 */
export const trackProjectView = (projectName) => {
  trackEvent('project_viewed', {
    event_category: 'projects',
    event_label: projectName,
  });
};

export const trackProjectDemoClick = (projectName, demoUrl) => {
  trackEvent('project_demo_clicked', {
    event_category: 'projects',
    event_label: projectName,
    demo_url: demoUrl,
  });
};

export const trackProjectGithubClick = (projectName, githubUrl) => {
  trackEvent('project_github_clicked', {
    event_category: 'projects',
    event_label: projectName,
    github_url: githubUrl,
  });
};

/**
 * Track downloads
 */
export const trackResumeDownload = (format = 'pdf') => {
  trackEvent('resume_downloaded', {
    event_category: 'downloads',
    event_label: `Resume ${format.toUpperCase()}`,
    file_format: format,
  });
};

/**
 * Track contact form interactions
 */
export const trackContactFormStart = () => {
  trackEvent('contact_form_started', {
    event_category: 'contact',
    event_label: 'Form Interaction',
  });
};

export const trackContactFormSubmit = (success, errorMessage = null) => {
  trackEvent('contact_form_submitted', {
    event_category: 'contact',
    event_label: success ? 'Success' : 'Failed',
    success: success,
    error_message: errorMessage,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (linkType, url) => {
  trackEvent('external_link_clicked', {
    event_category: 'external_links',
    event_label: linkType,
    destination_url: url,
  });
};

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform, url) => {
  trackEvent('social_media_clicked', {
    event_category: 'social',
    event_label: platform,
    destination_url: url,
  });
};

/**
 * Track blog interactions
 */
export const trackBlogPostClick = (postTitle, postUrl) => {
  trackEvent('blog_post_clicked', {
    event_category: 'blog',
    event_label: postTitle,
    post_url: postUrl,
  });
};

/**
 * Track section scrolls (when user reaches a section)
 */
export const trackSectionView = (sectionName) => {
  trackEvent('section_viewed', {
    event_category: 'engagement',
    event_label: sectionName,
  });
};

/**
 * Track time spent on page
 */
export const trackTimeOnPage = (seconds) => {
  trackEvent('time_on_page', {
    event_category: 'engagement',
    value: seconds,
  });
};

/**
 * Initialize session tracking
 */
export const initSessionTracking = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  
  // Track time on page when user leaves
  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(timeSpent);
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};
