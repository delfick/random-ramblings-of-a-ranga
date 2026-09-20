import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'

const webfinger = {
  subject: 'acct:shout@delfick.com',
  aliases: [
    'https://bsky.app/profile/shout.delfick.com',
    'https://shout.delfick.com/',
    'https://mastodon.social/@delfick',
    'https://mastodon.social/users/delfick'
  ],
  links: [
    {
      href: 'https://bsky.app/profile/shout.delfick.com',
      rel: 'http://webfinger.net/rel/profile-page',
      type: 'text/html'
    },
    {
      href: 'https://shout.delfick.com/',
      rel: 'http://webfinger.net/rel/profile-page',
      type: 'text/html'
    },
    {
      href: 'https://amanita.us-east.host.bsky.network/xrpc/com.atproto.sync.getBlob?did=did:plc:myln4meshy6cfnpyky6sz7kb&cid=bafkreictgl2cdtskmfegbrwrqlmulb3urvsuyjwpyceu4sifc36z7ya5ee',
      rel: 'http://webfinger.net/rel/avatar'
    },
    {
      href: 'https://amanita.us-east.host.bsky.network/xrpc/com.atproto.sync.getBlob?did=did:plc:myln4meshy6cfnpyky6sz7kb&cid=bafkreidry2xo2rvy4se3v6f55l7xkyiool6sfxbnizxdy2rgg34njpvnby',
      rel: 'http://webfinger.net/rel/avatar'
    },
    {
      href: 'https://bsky.app/profile/shout.delfick.com',
      rel: 'canonical_uri',
      type: 'text/html'
    },
    {
      href: 'https://bsky.brid.gy/ap/did:plc:myln4meshy6cfnpyky6sz7kb',
      rel: 'self',
      type: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"'
    },
    {
      href: 'https://bsky.brid.gy/ap/did:plc:myln4meshy6cfnpyky6sz7kb',
      rel: 'self',
      type: 'application/activity+json'
    },
    {
      href: 'https://bsky.brid.gy/ap/did:plc:myln4meshy6cfnpyky6sz7kb/inbox',
      rel: 'inbox',
      type: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"'
    },
    {
      href: 'https://bsky.brid.gy/ap/sharedInbox',
      rel: 'sharedInbox',
      type: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"'
    },
    {
      rel: 'http://ostatus.org/schema/1.0/subscribe',
      template: 'https://fed.brid.gy/bsky/shout.delfick.com?url={uri}'
    }
  ]
}

export const HEAD: RequestHandler = async ({ url }) => {
  if (url.searchParams.get('resource') == 'acct:shout@delfick.com') {
    return new Response(JSON.stringify(webfinger), {
      headers: {
        'content-type': 'application/jrd+json',
        'access-control-allow-origin': '*'
      }
    })
  }
  error(404, 'Not found')
}

export const GET: RequestHandler = async ({ url }) => {
  if (url.searchParams.get('resource') == 'acct:shout@delfick.com') {
    return new Response(JSON.stringify(webfinger), {
      headers: {
        'content-type': 'application/jrd+json',
        'access-control-allow-origin': '*'
      }
    })
  }

  error(404, 'Not found')
}
