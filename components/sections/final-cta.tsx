'use client'

import { motion } from 'framer-motion'
import { LogoMark } from '@/components/ui/logo'
import { InstallBlock } from '@/components/ui/install'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'
import { stats } from '@/content/catalogs'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden rounded-t-[2.5rem] bg-[#171034] py-24 md:rounded-t-[4rem] md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,45,85,0.34) 0%, rgba(175,82,222,0.28) 45%, transparent 70%)',
        }}
      />
      <div className="container-page relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-7 flex flex-col items-center gap-4">
            <LogoMark size={56} className="rounded-[22.5%] shadow-[0_10px_36px_-10px_rgba(175,82,222,0.7)]" />
            <span className="text-center">
              <span className="eyebrow block">Start tonight</span>
              <span className="mt-1 block text-sm text-subtle">ImprovTalk · iPhone &amp; Android</span>
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="display-lg text-ink">
            The first one is always the worst one.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Get it over with somewhere it costs you nothing. {stats.freeWeekly} conversations a week,
            free, no card.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex justify-center" id="early-access">
            <InstallBlock compact align="center" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
