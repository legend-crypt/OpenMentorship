const testimonials = [
    {
      body: 'I am a self-taught developer and OpenMentors has been a great platform for me to learn and grow. I have learned a lot from the mentors here.',
      author: {
        name: 'Leslie Alexander',
        handle: 'lesliealexander',
        imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
        body: 'OpenMentors is the best platform for learning and mentorship. I have learned a lot from the mentors here.',
        author: {
            name: 'John Addo',
            handle: 'johna',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
            },
    },
    {
        body: 'Without the help of the mentors at OpenMentors, I would not have been able to make my first open source contribution. I am grateful for the mentorship I received.',
        author: {
            name: 'Felix Agei',
            handle: 'ageifelix',
            imageUrl:
                'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
            },
    },
    {
        body: 'OpenMentors helped me to make my first open source contribution. I am grateful for the mentorship I received.',
        author: {
            name: 'Jane Mensah',
            handle: 'janem',
            imageUrl:
                'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',
            },
    },
    {
        body: 'I could not have made it without the help of the mentors at OpenMentors. I am grateful for the mentorship I received.',
        author: {
            name: 'Kwame Mensah',
            handle: 'kwamem',
            imageUrl:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
    },
    {
        body: 'I will recommend OpenMentors to anyone who wants to learn and grow in the tech industry. The mentors are very helpful.',
        author: {
            name: 'Kwaku Blacko',
            handle: 'blackok',
            imageUrl:
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D',
            },
    }
  ]
  
  export default function Testimonials() {
    return (
      <div className="bg-slate-200	 py-24 sm:py-32 mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            {/* <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Testimonials</h2> */}
            <p className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            What are people saying about OpenMentors?

            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                  <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                    <blockquote className="text-gray-900">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <img alt="" src={testimonial.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                        <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  