// This is a batch denom mapping between v1(left) and v1alpha1(right) for mainnet.
// This mapping has been created to find a transaction hashes made with v1alpha1.
// It is needed because logs produced with v1alpha1 have a different batch denom pattern from v1.
// Also a v1alpha1 batch denom can't be deduced from a v1 one, hence the static mapping.
export const v1Alpha1BatchDenomMapping: Record<string, string> = {
  'C01-002-20190101-20191231-001': 'C01-20190101-20191231-001',
  'C01-002-20190101-20191231-002': 'C01-20190101-20191231-002',
  'C01-001-20150101-20151231-001': 'C01-20150101-20151231-003',
  'C01-001-20150101-20151231-002': 'C01-20150101-20151231-004',
  'C01-001-20150101-20151231-003': 'C01-20150101-20151231-005',
  'C01-002-20190101-20191231-003': 'C01-20190101-20191231-006',
  'C01-001-20150101-20151231-004': 'C01-20150101-20151231-007',
  'C01-001-20150101-20151231-005': 'C01-20150101-20151231-008',
};
