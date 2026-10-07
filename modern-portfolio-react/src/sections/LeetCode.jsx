import { useEffect, useState } from 'react';
import Section from '../components/Section.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Icon from '../components/Icon.jsx';
import Button from '../components/Button.jsx';
import Tag from '../components/Tag.jsx';
import { leetcode } from '../data/config.js';
import { has } from '../utils/content.js';
import { fetchLeetCodeStats } from '../utils/leetcode.js';

const STAT_DEFS = [
  { key: 'solved', label: 'Problems Solved' },
  { key: 'easy', label: 'Easy', tone: 'easy' },
  { key: 'medium', label: 'Medium', tone: 'medium' },
  { key: 'hard', label: 'Hard', tone: 'hard' },
  { key: 'studyPlans', label: 'Study Plans Completed' },
];

export default function LeetCode({ index }) {
  const [stats, setStats] = useState(leetcode.stats || {});

  useEffect(() => {
    let alive = true;
    fetchLeetCodeStats(leetcode.username)
      .then((live) => {
        if (alive && live) setStats((s) => ({ ...s, ...Object.fromEntries(Object.entries(live).filter(([, v]) => v != null)) }));
      })
      .catch(() => {}); // keep manual values
    return () => {
      alive = false;
    };
  }, []);

  const visible = STAT_DEFS.filter((d) => typeof stats[d.key] === 'number');
  const { easy, medium, hard } = stats;
  const diffTotal = [easy, medium, hard].every((n) => typeof n === 'number') ? easy + medium + hard : 0;

  return (
    <Section id="leetcode" className="leetcode">
      <div className="leetcode__panel card" data-spotlight>
        <div className="leetcode__intro">
          <SectionHeader index={index} eyebrow="LeetCode / Coding Challenges" title="Practising problem solving" id="leetcode-title" />
          <p className="leetcode__text" data-reveal>
            {leetcode.intro}
          </p>
          {has(leetcode.focusAreas) && (
            <ul className="tags" role="list" aria-label="Focus areas" data-reveal>
              {leetcode.focusAreas.map((f) => (
                <li key={f}>
                  <Tag>{f}</Tag>
                </li>
              ))}
            </ul>
          )}
          {has(leetcode.profileUrl) && (
            <div className="leetcode__cta" data-reveal>
              <Button href={leetcode.profileUrl} variant="secondary" size="sm" icon="leetcode" iconPosition="start">
                View LeetCode profile
              </Button>
            </div>
          )}
        </div>

        <div className="leetcode__side" data-reveal>
          {visible.length > 0 ? (
            <>
              <dl className="leetcode__stats">
                {visible.map((d) => (
                  <div className={`leetcode__stat ${d.tone ? `is-${d.tone}` : ''}`} key={d.key}>
                    <dt>{d.label}</dt>
                    <dd>{stats[d.key]}</dd>
                  </div>
                ))}
              </dl>
              {diffTotal > 0 && (
                <div className="leetcode__bar" role="img" aria-label={`Easy ${easy}, Medium ${medium}, Hard ${hard}`}>
                  <span className="is-easy" style={{ flexGrow: easy }} />
                  <span className="is-medium" style={{ flexGrow: medium }} />
                  <span className="is-hard" style={{ flexGrow: hard }} />
                </div>
              )}
            </>
          ) : (
            <div className="leetcode__emblem" aria-hidden="true">
              <Icon name="leetcode" size={56} />
              <div className="leetcode__rings">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
