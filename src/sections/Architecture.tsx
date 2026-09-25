import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { BrutalCard } from '../components/BrutalCard';
import { ARCHITECTURE_NODES } from '../data/architecture';
import {
  ArrowDown,
  Cpu,
  Database,
  Radio,
  Server,
  Smartphone,
  ShieldCheck,
  Code2,
  CheckCircle,
} from 'lucide-react';

export const Architecture: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('kafka');

  const selectedNode =
    ARCHITECTURE_NODES.find((node) => node.id === selectedNodeId) || ARCHITECTURE_NODES[3];

  const getLayerIcon = (layer: string) => {
    switch (layer) {
      case 'client':
        return <Smartphone className="w-5 h-5" />;
      case 'gateway':
        return <ShieldCheck className="w-5 h-5" />;
      case 'core-services':
        return <Server className="w-5 h-5" />;
      case 'messaging':
        return <Radio className="w-5 h-5 text-[#FF6B9D]" />;
      case 'worker-services':
        return <Cpu className="w-5 h-5" />;
      case 'data':
        return <Database className="w-5 h-5" />;
      default:
        return <Server className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-16 md:py-24 border-t-[3px] border-[#111111] bg-[#F5F0E8]" id="architecture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          title="ENGINEERING ARCHITECTURE"
          subtitle="Distributed system topologies, decoupled event pipelines, and enterprise microservices design."
          accentColor="pink"
        />

        {/* Short Statement Quote (As required) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <BrutalCard variant="yellow" shadow="md" borderThick className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-[#111111] bg-white border border-[#111111] px-2 py-0.5">
                  SYSTEM PHILOSOPHY
                </span>
                <p className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#111111] tracking-tight leading-snug">
                  "I don't just build interfaces. I think about APIs, services, events, databases, authentication and deployment."
                </p>
              </div>
              <div className="shrink-0 font-mono text-xs font-bold border-2 border-[#111111] bg-white px-3 py-2 shadow-[2px_2px_0px_#111111]">
                SORM SOPHAT // ARCHITECTURE DESIGN
              </div>
            </div>
          </BrutalCard>
        </motion.div>

        {/* Interactive Architecture Flow & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Architecture Flow Diagram (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#111111] mb-2 font-mono text-xs font-black uppercase">
              <span>DISTRIBUTED EVENT FLOW (CLICK ANY NODE)</span>
              <span className="text-[#4D7CFE]">INTERACTIVE SCHEMATIC</span>
            </div>

            {ARCHITECTURE_NODES.map((node, index) => {
              const isSelected = selectedNode.id === node.id;
              const isLast = index === ARCHITECTURE_NODES.length - 1;

              return (
                <div key={node.id} className="relative">
                  {/* The Architecture Node Box */}
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full text-left p-4 md:p-5 border-[3px] border-[#111111] transition-all cursor-pointer font-mono select-none flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#111111] text-[#F5F0E8] shadow-[6px_6px_0px_#FFD84D] -translate-y-1'
                        : 'bg-white text-[#111111] hover:bg-[#F5F0E8] shadow-[4px_4px_0px_#111111]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 border-2 border-[#111111] ${
                          isSelected ? 'bg-[#FFD84D] text-[#111111]' : 'bg-[#F5F0E8] text-[#111111]'
                        }`}
                      >
                        {getLayerIcon(node.layer)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-black uppercase px-1.5 py-0.5 border ${
                              isSelected
                                ? 'bg-white text-[#111111] border-white'
                                : 'bg-[#FFD84D] text-[#111111] border-[#111111]'
                            }`}
                          >
                            LAYER 0{index + 1}
                          </span>
                          <span
                            className={`text-[11px] font-bold ${
                              isSelected ? 'text-gray-300' : 'text-[#111111]/70'
                            }`}
                          >
                            {node.role}
                          </span>
                        </div>
                        <h4 className="text-base md:text-lg font-black uppercase tracking-tight mt-0.5">
                          {node.title}
                        </h4>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end text-right">
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? 'text-[#FFD84D]' : 'text-[#4D7CFE]'
                        }`}
                      >
                        {node.technologies[0]}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {isSelected ? '● ACTIVE INSPECTOR' : 'CLICK TO INSPECT'}
                      </span>
                    </div>
                  </button>

                  {/* Flow Arrow */}
                  {!isLast && (
                    <div className="flex items-center justify-center my-1.5">
                      <div className="flex items-center gap-1.5 px-3 py-0.5 border border-[#111111] bg-white font-mono text-[10px] font-black uppercase shadow-[1px_1px_0px_#111111]">
                        <ArrowDown className="w-3 h-3 text-[#111111]" />
                        <span>
                          {index === 0 && 'HTTPS REST / JSON'}
                          {index === 1 && 'REVERSE PROXY & JWT AUTH'}
                          {index === 2 && 'ASYNC KAFKA PRODUCER'}
                          {index === 3 && 'PARTITIONED CONSUMERS'}
                          {index === 4 && 'ACID TRANSACTION / STORAGE'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Node Detail Inspector (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <BrutalCard variant="white" shadow="lg" borderThick className="overflow-hidden">
              {/* Header */}
              <div className="bg-[#111111] text-[#F5F0E8] p-4 border-b-[3px] border-[#111111] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#FFD84D]" />
                  <span className="font-bold uppercase">NODE TELEMETRY & SPECS</span>
                </div>
                <span className="bg-[#FFD84D] text-[#111111] font-black px-2 py-0.5 border border-black text-[10px]">
                  {selectedNode.layer.toUpperCase()}
                </span>
              </div>

              {/* Inspector Content */}
              <div className="p-6 space-y-5">
                <div>
                  <span className="font-mono text-xs font-bold text-[#4D7CFE] uppercase">
                    {selectedNode.role}
                  </span>
                  <h3 className="text-2xl font-black uppercase text-[#111111] mt-0.5">
                    {selectedNode.title}
                  </h3>
                  <p className="font-sans text-sm text-[#111111]/85 font-medium leading-relaxed mt-2">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Tech Stack in Node */}
                <div>
                  <h4 className="font-mono text-xs font-black uppercase text-[#111111]/70 mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 border-2 border-[#111111] bg-[#FFD84D] font-mono text-xs font-extrabold shadow-[2px_2px_0px_#111111]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Payload / Event Snippet */}
                {(selectedNode.samplePayload || selectedNode.sampleEvent) && (
                  <div className="border-2 border-[#111111] bg-[#111111] p-3 text-[#F5F0E8] font-mono text-xs shadow-[3px_3px_0px_#111111]">
                    <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-gray-700 text-gray-400 text-[10px]">
                      <span>
                        {selectedNode.sampleEvent ? 'KAFKA EVENT RECORD' : 'REQUEST / DATA SIGNATURE'}
                      </span>
                      <span className="text-[#B7F34A]">STRICT TYPING</span>
                    </div>
                    <pre className="overflow-x-auto whitespace-pre font-mono text-[11px] leading-tight text-[#B7F34A]">
                      {selectedNode.sampleEvent || selectedNode.samplePayload}
                    </pre>
                  </div>
                )}

                {/* Microservice Design Principles */}
                <div className="border-t-2 border-[#111111] pt-4 font-mono text-xs space-y-1.5 text-[#111111]">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Fault Isolation & Circuit Breaking</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Decoupled Asynchronous Processing</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Containerized Deployment via Docker & K8s</span>
                  </div>
                </div>
              </div>
            </BrutalCard>
          </div>
        </div>
      </div>
    </section>
  );
};
