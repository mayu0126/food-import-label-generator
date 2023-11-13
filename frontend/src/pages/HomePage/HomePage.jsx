import React from 'react';

function HomePage() {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="mb-8 flex justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-rose-600/60 hover:ring-rose-600/80">
          Get started with 1 month of free services.{' '}
          <a href="onemonthfree" className="font-semibold text-rose-600">
            <span className="absolute inset-0" aria-hidden="true" />
            Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Generate import labels for your food products
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
            Create an account or log in to curate your own collections of labels and save them for future use
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="getstarted"
            className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            Get started
          </a>
          <a href="learnmore" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;